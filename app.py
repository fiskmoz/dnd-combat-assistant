from flask import Flask, jsonify, render_template, request, Response, send_from_directory
import os
import mimetypes
import json
import uuid
import sys
import datetime
import random

app = Flask(__name__)
mimetypes.init()
mimetypes.add_type("application/javascript", ".js", True)
mimetypes.add_type("image/vnd.microsoft.icon", ".ico", True)


# LOAD MONSTER DATA
with open('./data/monstersv2.json') as file:
    monster_data = json.load(file)

# LOAD CR TO XP TABLE
with open('./data/challenge_rating_to_xp.json') as file:
    cr_to_xp_table = json.load(file)

# LOAD ENCOUNTER XP THRESHOLDS
with open('./data/encounter_thresholds.json') as file:
    encounter_thresholds = json.load(file)

# CONSTANTS
possible_locations = ["city", "village", "mountain", "sea", "sky", "cave",
                      "plain", "frostlands", "swamp", "forest", "underdark"]
# Extend possible types
possible_types_dict = {
    "city": ["construct", "elemental", "humanoid, undead", 'aberration'],
    "village": ["humanoid", "dragon", 'monstrosity', 'giant', 'aberration'],
    "mountain": ["giant", "dragon", 'monstrosity', 'humanoid'],
    "sea": ["monstrosity", "beast", "dragon", 'humanoid', 'aberration', "fey"],
    "sky": ["celestial", "monstrosity", "dragon"],
    "cave": ["monstrosity", "dragon", 'elemental', 'plant', 'giant', 'aberration', 'swarm of Tiny beasts'],
    "plain": ["humanoid", "beast", "undead", "dragon", 'elemental', 'humanoid', 'plant', 'swarm of Tiny beasts'],
    "frostlands": ["monstrosity", "beast", 'elemental'],
    "swamp": ["giant", "ooze", 'monstrosity', 'swarm of Tiny beasts'],
    "forest": ["beast", "ooze", "plant", "swarm of tiny beasts,'monstrosity", 'humanoid', 'fey'],
    "underdark": ["undead", "fiend", "humanoid", "dragon"],
}

possible_allignments = ["lawful good", "neutral good", "chaotic good", "lawful neutral",
                        "neutral", "chaotic neutral", "lawful evil", "neutral evil", "chaotic good", "unaligned"]
#
possible_types_all = ['dragon', 'elemental', 'monstrosity', 'construct', 'beast', 'humanoid', 'plant',
                      'fiend', 'ooze', 'fey', 'giant', 'celestial', 'aberration', 'undead', 'swarm of Tiny beasts']


@app.route('/')
def index():
    return send_from_directory("static/", "index.html")


@app.route('/api/encounter/thresholds')
def threshholds():
    response = app.response_class(
        response=json.dumps(encounter_thresholds),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/api/encounter/crtable')
def crtable():
    response = app.response_class(
        response=json.dumps(cr_to_xp_table),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/api/encounters/generate')
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
        if not monsterFitsGeolocation(monster_data, key, geolocation):
            continue
        while True:
            response_json[response_index] = monster_data[key]
            challenge_ratings.remove(monster_data[key]['challenge_rating'])
            response_index += 1
            if not monster_data[key]['challenge_rating'] in challenge_ratings or random.randint(0, 100) <= 35:
                break

    if len(challenge_ratings) > 0:
        print("failed to assign all monsters, try duplicating?")

    response = app.response_class(
        response=json.dumps(response_json),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory("static/", path, mimetype=mimetypes.guess_type(path)[0])


def GetChallengeRatings(partyxp, members):
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
        random_percentage = random.randint(30, 60) / 100
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


def monsterFitsGeolocation(monster_data, key, geolocation):
    if geolocation == 'sea':
        if 'swim' in monster_data[key]['speed_json']:
            return True
        if not 'special_abilities' in monster_data[key]:
            return False
        for ability in monster_data[key]['special_abilities']:
            if ability['name'] == 'Amphibious':
                return True
        return False
    elif geolocation == 'sky':
        if 'fly' in monster_data[key]['speed_json']:
            return True
        return False
    elif geolocation == 'land':
        if 'walk' in monster_data[key]['speed_json']:
            if monster_data[key]['speed_json']['walk'] != "0":
                return True
        return False
    return True


def SendBadRequest(text):
    response = app.response_class(
        response=text,
        status=400,
        mimetype='application/text'
    )
    return response


if __name__ == "__main__":
    app.run()
