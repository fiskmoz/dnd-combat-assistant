from flask import Flask, jsonify, render_template, request, Response, send_from_directory
import os
import mimetypes
import json
import uuid
import sys
import datetime
import random
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


app = Flask(__name__)
mimetypes.init()
mimetypes.add_type("application/javascript", ".js", True)
mimetypes.add_type("image/vnd.microsoft.icon", ".ico", True)

# LOAD FIREBASE ADMIN RIGHTS
if os.path.isfile("./firebase_cred.json"):
    with open("./firebase_cred.json") as file:
        cred = credentials.Certificate(json.load(file))
else:
    cred = credentials.Certificate({
        "type": os.environ.get('type').replace('\\n', '\n'),
        "project_id": os.environ.get('project_id').replace('\\n', '\n'),
        "private_key_id": os.environ.get('private_key_id').replace('\\n', '\n'),
        "private_key": os.environ.get('private_key').replace('\\n', '\n'),
        "client_email": os.environ.get('client_email').replace('\\n', '\n'),
        "client_id": os.environ.get('client_id').replace('\\n', '\n'),
        "auth_uri": os.environ.get('auth_uri').replace('\\n', '\n'),
        "token_uri": os.environ.get('token_uri').replace('\\n', '\n'),
        "auth_provider_x509_cert_url": os.environ.get('auth_provider_x509_cert_url').replace('\\n', '\n'),
        "client_x509_cert_url": os.environ.get('client_x509_cert_url').replace('\\n', '\n'),
    })
if cred == None:
    raise RuntimeError("Failed to fetch firebase credentials")

firebase_admin.initialize_app(cred)
db = firestore.client()
grids_auth = {el.id: el.to_dict()
              for el in db.collection(u'Campaigns').stream()}

# LOAD MONSTER DATA
with open('./data/monstersv2.json') as file:
    monster_data = json.load(file)

# LOAD CR TO XP TABLE
with open('./data/challenge_rating_to_xp.json') as file:
    cr_to_xp_table = json.load(file)

# LOAD ENCOUNTER XP THRESHOLDS
with open('./data/encounter_thresholds.json') as file:
    encounter_thresholds = json.load(file)

# LOAD MONSTERS MULTIPLIER
with open('./data/monsters_multiplier.json') as file:
    monsters_multiplier = json.load(file)

# CONSTANTS
possible_locations = ["city", "village", "mountain", "cave",
                      "plain", "swamp", "forest", "underdark"]
# Extend possible types
possible_types_dict = {
    "city": ["construct", "elemental", "humanoid, undead", 'aberration', 'fiend'],
    "village": ["construct", "elemental", "humanoid", "dragon", 'monstrosity', 'giant', 'aberration', 'fiend'],
    "mountain": ["giant", "dragon", 'monstrosity', 'humanoid', 'celestial'],
    "cave": ["monstrosity", "dragon", 'elemental', 'plant', 'giant', 'aberration', 'swarm of Tiny beasts', "beasts", "humanoid"],
    "plain": ["humanoid", "fiend", "beast", "undead", "ooze", "dragon", 'elemental', 'humanoid', 'plant', 'swarm of Tiny beasts'],
    "swamp": ["giant", "ooze", 'monstrosity', 'swarm of Tiny beasts', "humanoid"],
    "forest": ["beast", "ooze", "plant", "swarm of tiny beasts,'monstrosity", 'humanoid', 'fey'],
    "underdark": ["undead", "fiend", "humanoid", "dragon"],
}

possible_allignments = ["lawful good", "neutral good", "chaotic good", "lawful neutral",
                        "neutral", "chaotic neutral", "lawful evil", "neutral evil", "chaotic good", "unaligned"]
#
possible_types_all = ['dragon', 'elemental', 'monstrosity', 'construct', 'beast', 'humanoid', 'plant',
                      'fiend', 'ooze', 'fey', 'giant', 'celestial', 'aberration', 'undead', 'swarm of Tiny beasts']

# BLACKLISTED MONSTERS BY NAME
blacklisted_monsters = ['Commoner']
blacklisted_sea_creatures = ['Sahuagin']


@app.route('/')
def index():
    return send_from_directory("static/", "index.html")


@app.route('/api/encounter/thresholds')
def threshholds():
    return app.response_class(
        response=json.dumps(encounter_thresholds),
        status=200,
        mimetype='application/json'
    )


@app.route('/api/encounter/crtable')
def crtable():
    return app.response_class(
        response=json.dumps(cr_to_xp_table),
        status=200,
        mimetype='application/json'
    )


@app.route('/api/encounter/multiplier')
def multipliers():
    return app.response_class(
        response=json.dumps(monsters_multiplier),
        status=200,
        mimetype='application/json')


@app.route('/api/encounter/names')
def names():
    return app.response_class(
        response=json.dumps(
            sorted([value['name'] for value in monster_data])
        ),
        status=200,
        mimetype='application/json'
    )


@app.route('/api/encounter/monster')
def name():
    name = request.args.get('name').lower()
    if name is None:
        return SendBadRequest('name is not set propperly')

    monster = [value for value in monster_data if name ==
               value['name'].lower()]
    if monster is None:
        return SendBadRequest('could not find monster with that name')
    response = app.response_class(
        response=json.dumps(monster),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/api/encounter/generate')
def generate():
    partyxp = request.args.get('partyxp')
    monsters = request.args.get('monsters')
    locations = request.args.get('locations')
    origins = request.args.get('origins')
    geolocation = request.args.get('geolocation')

    if partyxp == None or monsters == None or locations == None or origins == None or geolocation == None:
        return SendBadRequest('Invalid request parameters')

    # should validate partyxp and monsters, non ints will not cause crash here.
    challenge_ratings = GetChallengeRatings(int(partyxp), int(monsters))
    response_json = {}
    response_index = 0
    possible_types = []
    previous_type = ""
    locations_list = locations.split('-')

    for location in locations_list:
        if location in possible_locations:
            possible_types = possible_types + possible_types_dict[location]

    # REMOVE DUPLICATES
    possible_types = list(dict.fromkeys(possible_types))
    random.shuffle(monster_data)

    for key in range(len(monster_data)):
        if not monster_data[key]['challenge_rating'] in challenge_ratings or monster_data[key]['named'] or not monster_data[key]['origin'] in origins:
            continue
        if monster_data[key]['type'] not in possible_types:
            continue
        if not monsterFitsGeolocation(key, geolocation):
            continue
        if not monsterFitsPreviousType(key, previous_type):
            if monster_data[key]['type'] != 'humanoid':
                continue
        if monster_data[key]['name'] in blacklisted_monsters:
            continue
        while True:
            response_json[response_index] = monster_data[key]
            challenge_ratings.remove(monster_data[key]['challenge_rating'])
            response_index += 1
            previous_type = monster_data[key]['type']
            if not monster_data[key]['challenge_rating'] in challenge_ratings or random.randint(0, 100) <= 25:
                break

    if len(challenge_ratings) > 0:
        for rating in challenge_ratings:
            for monster_key in range(len(response_json)):
                if response_json[monster_key]['challenge_rating'] == rating:
                    response_json[response_index] = response_json[monster_key]
                    response_index += 1

    response = app.response_class(
        response=json.dumps(response_json),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/api/grids/authenticate')
def grid_auth():
    gridid = request.args.get('gridid')
    password = request.args.get('password')
    if grids_auth.get(gridid) != None:
        if grids_auth.get(gridid).get('password') == password:
            return app.response_class(
                response=json.dumps({'response': 'success'}),
                status=200,
                mimetype='application/json'
            )
        return SendBadRequest('Invalid credentials')
    return SendBadRequest('No grid with that ID was found')


@app.route('/api/grids/update', methods=['POST'])
def grid_update():
    gridid = request.args.get('gridid')
    data = request.data.decode("utf-8")
    print(data)
    print(gridid)
    if grids_auth.get(gridid) == None:
        return SendBadRequest('No such room')
    db.collection(u'Grids').document(gridid).update({"grid": data})
    return app.response_class(
        response=json.dumps({'response': 'success'}),
        status=200,
        mimetype='application/json'
    )


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory("static/", path, mimetype=mimetypes.guess_type(path)[0])


def GetChallengeRatings(partyxp, members):
    partyxp = partyxp / monsters_multiplier[str(members)]
    if members == 1:
        return [ChallengeRatingByExperience(partyxp)]
    challenge_ratings = []
    remainingxp = partyxp
    for index in range(members):
        if index+1 == members:
            challenge_ratings.append(
                str(ChallengeRatingByExperience(remainingxp)))
            continue
        # Adjust these for more fair encounters.
        random_percentage = (random.randint(15, 35) / 100) / (members / 2)
        challenge_ratings.append(
            str(ChallengeRatingByExperience(remainingxp*random_percentage)))
        remainingxp = remainingxp * (1 - random_percentage)
    return challenge_ratings


def ChallengeRatingByExperience(experience):
    previous_cr = None
    for cr in cr_to_xp_table:
        if previous_cr == None:
            if experience <= int(cr_to_xp_table[cr]):
                return cr
            previous_cr = cr
        else:
            if experience <= int(cr_to_xp_table[cr]) + (int(cr_to_xp_table[cr]) - int(cr_to_xp_table[previous_cr])) / 1.5:
                return cr


def monsterFitsGeolocation(key, geolocation):
    if geolocation == 'sea':
        if 'swim' in monster_data[key]['speed_json']:
            return True
        if not 'special_abilities' in monster_data[key]:
            return False
        for ability in monster_data[key]['special_abilities']:
            if ability['name'] == 'Amphibious':
                return True
        return False

    # Remove sea creatures
    if not 'walk' in monster_data[key]['speed_json'] or monster_data[key]['speed_json']['walk'] == 0 or monster_data[key]['subtype'] == 'merfolk' or monster_data[key]['name'] in blacklisted_sea_creatures:
        return False

    if geolocation == 'sky':
        if 'fly' in monster_data[key]['speed_json']:
            return True
        return False
    if geolocation == 'land':
        return True
    return True


def monsterFitsPreviousType(key, previous_type):
    if previous_type == "":
        return True
    if monster_data[key]['type'] == previous_type:
        return True
    return False


def SendBadRequest(text):
    return app.response_class(
        response=text,
        status=400,
        mimetype='application/text'
    )


if __name__ == "__main__":
    app.run()
