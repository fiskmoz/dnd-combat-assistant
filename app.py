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
                      "plain", "desert", "frostlands", "swamp", "forrest", "underdark"]
# Extend possible types
possible_types_city = ["construct", "elemental", "humanoid, undead"]
possible_types_village = ["humanoid"]
possible_types_mointain = ["gigant"]
possible_types_sea = ["monstrosity"]
possible_types_sky = ["celestrial", "monstrosity"]
possible_types_cave = ["monstrosity"]
possible_types_plain = ["humanoid", "beast", "undead"]
possible_types_frostlands = ["monstrosity", "beast"]
possible_types_swamp = ["gigant", "ooze"]
possible_types_forrest = ["beast", "ooze", "plant", "swarm of tiny beasts"]
possible_types_underdark = ["undead", "fiend", "humanoid"]
possible_allignments = ["lawful good", "neutral good", "chaotic good", "lawful neutral",
                        "neutral", "chaotic neutral", "lawful evil", "neutral evil", "chaotic good", "unaligned"]


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
    location = request.args.get('location')
    alignment = request.args.get('alignment')
    origins = request.args.get('origins').split('-')

    # IF ALIGNMENT PROVIDED IS VALID.
    # VALIDATE ALL PROPS
    challenge_ratings = GetChallengeRatings(str(partyxp), str(monsters))

    # EXTEND WITH:
    # description and speed recognicion of key words, such as speed: swimming or darkvision or languages
    response_json = {}
    response_index = 0
    if location != None:
        possible_types = GetValidTypes(location)
    random.shuffle(monster_data)
    for key in range(len(monster_data)):
        if monster_data[key]['challenge_rating'] in challenge_ratings and not monster_data[key]['named'] and monster_data[key]['origin'] in origins:
            if location != None:
                if monster_data[key]['type'] not in possible_types:
                    continue
            response_json[response_index] = monster_data[key]
            response_index += 1
            challenge_ratings.remove(monster_data[key]['challenge_rating'])
            # ONLY IF LOWEST CR IN MONSTER PARTY
            while monster_data[key]['challenge_rating'] in challenge_ratings and random.randint(0, 100) < 50:
                response_json[response_index] = monster_data[key]
                challenge_ratings.remove(monster_data[key]['challenge_rating'])
                response_index += 1

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
    partyxp = int(partyxp)
    members = int(members)
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
        random_percentage = random.randint(25, 75) / 100
        challenge_ratings.append(
            str(ChallengeRatingByExperience(remainingxp*random_percentage)))
        remainingxp = remainingxp * (1 - random_percentage)
    return challenge_ratings


def ChallengeRatingByExperience(experience):
    if experience < 11500:
        if experience < 2300:
            if experience < 10:
                return "0"
            elif experience <= 25:
                return "1/8"
            elif experience <= 50:
                return "1/4"
            elif experience <= 100:
                return "1/2"
            elif experience <= 200:
                return "1"
            elif experience <= 450:
                return "2"
            elif experience <= 700:
                return "3"
            elif experience <= 1100:
                return "4"
            elif experience <= 1800:
                return "5"
            elif experience <= 2300:
                return "6"
        else:
            if experience <= 2900:
                return "7"
            elif experience <= 3900:
                return "8"
            elif experience <= 5000:
                return "9"
            elif experience <= 5900:
                return "10"
            elif experience <= 7200:
                return "11"
            elif experience <= 8400:
                return "12"
            elif experience <= 10000:
                return "13"
            elif experience <= 11500:
                return "14"
    else:
        if experience < 41000:
            if experience < 13000:
                return "15"
            elif experience <= 15000:
                return "16"
            elif experience <= 18000:
                return "17"
            elif experience <= 20000:
                return "18"
            elif experience <= 22000:
                return "19"
            elif experience <= 25000:
                return "20"
            elif experience <= 33000:
                return "21"
            elif experience <= 41000:
                return "22"
        else:
            if experience <= 50000:
                return "23"
            elif experience <= 62000:
                return "24"
            elif experience <= 75000:
                return "25"
            elif experience <= 90000:
                return "26"
            elif experience <= 105000:
                return "27"
            elif experience <= 120000:
                return "28"
            elif experience <= 135000:
                return "29"
            elif experience <= 155000:
                return "30"


def GetValidTypes(location):
    if location == "city":
        return possible_types_city
    elif location == "forrest":
        return possible_types_forrest
    elif location == "village":
        return possible_types_village
    elif location == "mountain":
        return possible_types_mointain
    elif location == "sea":
        return possible_types_sea
    elif location == "sky":
        return possible_types_sky
    elif location == "cave":
        return possible_types_cave
    elif location == "plain":
        return possible_types_plain
    elif location == "frostland":
        return possible_types_frostlands
    elif location == "swamp":
        return possible_types_swamp
    elif location == "underdark":
        return possible_types_underdark


if __name__ == "__main__":
    app.run()
