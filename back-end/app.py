""" backend starts here """

import os
import mimetypes
import json
import random
from inspect import _void
from typing import List
from flask import Flask, request, send_from_directory

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


app = Flask(__name__)
mimetypes.init()
mimetypes.add_type("application/javascript", ".js", True)
mimetypes.add_type("image/vnd.microsoft.icon", ".ico", True)

# LOAD FIREBASE ADMIN RIGHTS
if os.path.isfile("./firebase_creds.json"):
    with open("./firebase_creds.json", encoding='UTF-8') as file:
        cred = credentials.Certificate(json.load(file))
        app.config["ENV"] = "development"
        app.config["DEBUG"] = True
else:
    cred = credentials.Certificate(
        {
            "type": os.environ.get("type").replace("\\n", "\n"),
            "project_id": os.environ.get("project_id").replace("\\n", "\n"),
            "private_key_id": os.environ.get("private_key_id").replace("\\n", "\n"),
            "private_key": os.environ.get("private_key").replace("\\n", "\n"),
            "client_email": os.environ.get("client_email").replace("\\n", "\n"),
            "client_id": os.environ.get("client_id").replace("\\n", "\n"),
            "auth_uri": os.environ.get("auth_uri").replace("\\n", "\n"),
            "token_uri": os.environ.get("token_uri").replace("\\n", "\n"),
            "auth_provider_x509_cert_url": os.environ.get(
                "auth_provider_x509_cert_url"
            ).replace("\\n", "\n"),
            "client_x509_cert_url": os.environ.get("client_x509_cert_url").replace(
                "\\n", "\n"
            ),
        }
    )
if cred is None:
    raise RuntimeError("Failed to fetch firebase credentials")
print("initialize creds..")

firebase_admin.initialize_app(cred)
db = firestore.client()
grids_auth = {el.id: el.to_dict()
              for el in db.collection("Campaigns").stream()}

# LOAD MONSTER DATA
with open("./data/monstersv2.json", encoding='UTF-8') as file:
    monster_data = json.load(file)

# LOAD CR TO XP TABLE
with open("./data/challenge_rating_to_xp.json", encoding='UTF-8') as file:
    cr_to_xp_table = json.load(file)

# LOAD ENCOUNTER XP THRESHOLDS
with open("./data/encounter_thresholds.json", encoding='UTF-8') as file:
    encounter_thresholds = json.load(file)

# LOAD MONSTERS MULTIPLIER
with open("./data/monsters_multiplier.json", encoding='UTF-8') as file:
    monsters_multiplier = json.load(file)

# LOAD SPELLS
with open("./data/spells.json", encoding='UTF-8') as file:
    spells_book = json.load(file)

# LOAD WEAPONS
with open("./data/5e_weapons.json", encoding='UTF-8') as file:
    weapons_data = json.load(file)

# LOAD CONDITIONS
with open("./data/5e_conditions.json", encoding='UTF-8') as file:
    conditions_data = json.load(file)

# LOAD POSSIBLE TYPES
with open("./data/5e_possible_types.json", encoding='UTF-8') as file:
    possible_types_dict = json.load(file)

# CONSTANTS
possible_locations = [
    "city",
    "village",
    "mountain",
    "cave",
    "plain",
    "swamp",
    "forest",
    "underdark",
]

possible_allignments = [
    "lawful good",
    "neutral good",
    "chaotic good",
    "lawful neutral",
    "neutral",
    "chaotic neutral",
    "lawful evil",
    "neutral evil",
    "chaotic good",
    "unaligned",
]
#
possible_types_all = [
    "dragon",
    "elemental",
    "monstrosity",
    "construct",
    "beast",
    "humanoid",
    "plant",
    "fiend",
    "ooze",
    "fey",
    "giant",
    "celestial",
    "aberration",
    "undead",
    "swarm of Tiny beasts",
]


# BLACKLISTED MONSTERS BY NAME
blacklisted_monsters = ["Commoner"]
blacklisted_sea_creatures = ["Sahuagin"]

print("initialize static data..")


@app.route("/search")
@app.route("/dice")
@app.route("/generate")
@app.route("/initiative")
@app.route("/grid")
@app.route("/")
def index():
    """returns static data for the angular application"""
    return send_from_directory("../static/", "index.html")


@app.route("/api/encounter/thresholds")
def thresholds():
    """returns the thresholds for different encounter difficulties"""
    return app.response_class(
        response=json.dumps(encounter_thresholds),
        status=200,
        mimetype="application/json",
    )


@app.route("/api/encounter/crtable")
def crtable():
    """returns the encounter challenge rating table"""
    return app.response_class(
        response=json.dumps(cr_to_xp_table), status=200, mimetype="application/json"
    )


@app.route("/api/encounter/multiplier")
def multipliers():
    """returns the encounter multiplier"""
    return app.response_class(
        response=json.dumps(monsters_multiplier),
        status=200,
        mimetype="application/json",
    )


@app.route("/api/data/weapons")
def get_weapons():
    """returns all available weapons"""
    return app.response_class(
        response=json.dumps(weapons_data), status=200, mimetype="application/json"
    )


@app.route("/api/data/conditions")
def get_conditions():
    """returns all available conditions"""
    return app.response_class(
        response=json.dumps(conditions_data), status=200, mimetype="application/json"
    )


@app.route("/api/encounter/monster/quicksort")
def monster_quicksort():
    """returns a subset of all monster data as list"""
    return app.response_class(
        response=json.dumps(
            dict(
                {
                    i: dict(
                        {
                            "name": x["name"],
                            "type": x["type"],
                            "challenge_rating": x["challenge_rating"],
                        }
                    )
                    for i, x in enumerate(monster_data)
                }
            )
        ),
        status=200,
        mimetype="application/json",
    )


@app.route("/api/spellbook/quicksort")
def spell_quicksort():
    """returns a subset of all spelldata as list"""
    return app.response_class(
        response=json.dumps(
            dict(
                {
                    i: dict(
                        {
                            "name": x["name"],
                            "level": x["level"],
                            "classes": x["classes"],
                        }
                    )
                    for i, x in enumerate(spells_book)
                }
            )
        ),
        status=200,
        mimetype="application/json",
    )


@app.route("/api/encounter/monster")
def get_monster_by_name():
    """gets monster by name"""
    monster_name = request.args.get("name").lower()
    if monster_name is None:
        return send_bad_request("name is not set propperly")

    monster = [value for value in monster_data if monster_name ==
               value["name"].lower()]
    if monster is None:
        return send_bad_request("could not find monster with that name")
    response = app.response_class(
        response=json.dumps(monster), status=200, mimetype="application/json"
    )
    return response


@app.route("/api/spellbook/spell")
def get_spell_by_name():
    """gets spell by name"""
    spell_name = request.args.get("name").lower()
    if spell_name is None:
        return send_bad_request("name is not set propperly")

    spell = [value for value in spells_book if spell_name ==
             value["name"].lower()]
    if spell is None:
        return send_bad_request("could not find spell with that name")
    response = app.response_class(
        response=json.dumps(spell), status=200, mimetype="application/json"
    )
    return response


@app.route("/api/encounter/generate")
def generate():
    """generates encounter by providing specificed params"""
    partyxp = request.args.get("partyxp")
    monsters = request.args.get("monsters")
    locations = request.args.get("locations")
    origins = request.args.get("origins")
    geolocation = request.args.get("geolocation")
    spread = request.args.get("spread")

    if (
        partyxp is None
        or monsters is None
        or locations is None
        or origins is None
        or geolocation is None
        or spread is None
    ):
        return send_bad_request("Invalid request parameters")

    # should validate partyxp and monsters, non ints will not cause crash here.
    challenge_ratings = get_challenge_ratings(
        int(partyxp), int(monsters), int(spread))
    response_json = {}
    response_index = 0
    possible_types = []
    previous_type = ""
    locations_list = locations.split("-")

    for location in locations_list:
        if location in possible_locations:
            possible_types = possible_types + possible_types_dict[location]

    # REMOVE DUPLICATES
    possible_types = list(dict.fromkeys(possible_types))
    random.shuffle(monster_data)

    for key in range(len(monster_data)):
        if (
            not monster_data[key]["challenge_rating"] in challenge_ratings
            or monster_data[key]["named"]
            or not monster_data[key]["origin"] in origins
        ):
            continue
        if monster_data[key]["type"] not in possible_types:
            continue
        if not monster_fits_geolocation(key, geolocation):
            continue
        if not monster_fits_previous_type(key, previous_type):
            if monster_data[key]["type"] != "humanoid":
                continue
        if monster_data[key]["name"] in blacklisted_monsters:
            continue
        while True:
            response_json[response_index] = monster_data[key]
            challenge_ratings.remove(monster_data[key]["challenge_rating"])
            response_index += 1
            previous_type = monster_data[key]["type"]
            if (
                not monster_data[key]["challenge_rating"] in challenge_ratings
                or random.randint(0, 100) <= 25
            ):
                break

    if len(challenge_ratings) > 0:
        for rating in challenge_ratings:
            for monster_key in range(len(response_json)):
                if response_json[monster_key]["challenge_rating"] == rating:
                    response_json[response_index] = response_json[monster_key]
                    response_index += 1

    response = app.response_class(
        response=json.dumps(response_json), status=200, mimetype="application/json"
    )
    return response


@app.route("/api/grids/authenticate")
def grid_auth():
    """updates the firebase grid with provided data"""
    gridid = request.args.get("gridid")
    password = request.args.get("password")
    if grids_auth[gridid] is None:
        return send_bad_request("No grid with that ID was found")
    if grids_auth.get(gridid).get("password") == password:
        return app.response_class(
            response=json.dumps({"response": "success"}),
            status=200,
            mimetype="application/json",
        )
    return send_bad_request("Invalid credentials")


@app.route("/api/grids/update", methods=["POST"])
def grid_update():
    """updates the firebase grid with provided data"""
    gridid = request.args.get("gridid")
    data = request.data.decode("utf-8")
    if grids_auth[gridid] is None:
        return send_bad_request("No grid with that ID was found")
    db.collection("Grids").document(gridid).update({"grid": data})
    return app.response_class(
        response=json.dumps({"response": "success"}),
        status=200,
        mimetype="application/json",
    )


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_static(path):
    """serves static files for the frontend"""
    return send_from_directory("../static/", path, mimetype=mimetypes.guess_type(path)[0])


###

# PRIVATE

###

def get_challenge_ratings(partyxp: int, members: int, spread: int) -> List[str]:
    """gets a list of challenge ratings for a party adjusted by input params"""
    partyxp = partyxp / monsters_multiplier[str(members)]
    if members == 1:
        return [challenge_ratings_by_experience(partyxp)]
    challenge_ratings = []
    remainingxp = partyxp
    for m_index in range(members):
        if m_index + 1 == members:
            challenge_ratings.append(
                str(challenge_ratings_by_experience(remainingxp)))
            continue
        # Adjust these for more fair encounters.
        random_percentage = (random.randint(round(spread / 2), spread) / 100) / (
            members / 2
        )
        challenge_ratings.append(
            str(challenge_ratings_by_experience(
                remainingxp * random_percentage))
        )
        remainingxp = remainingxp * (1 - random_percentage)
    return challenge_ratings


def challenge_ratings_by_experience(experience: int) -> str:
    """determine callenge rating by the provided experience"""
    previous_challenge_rating = None
    for challenge_rating in cr_to_xp_table:
        if previous_challenge_rating is None:
            if experience <= int(cr_to_xp_table[challenge_rating]):
                return challenge_rating
            previous_challenge_rating = challenge_rating
        else:
            if (
                experience
                <= int(cr_to_xp_table[challenge_rating])
                + (int(cr_to_xp_table[challenge_rating]) -
                   int(cr_to_xp_table[previous_challenge_rating])) / 1.5
            ):
                return challenge_rating


def monster_fits_geolocation(key: int, geolocation: str) -> bool:
    """determine if monster a specific geolocation as string"""
    if geolocation == "sea":
        if "swim" in monster_data[key]["speed_json"]:
            return True
        if not "special_abilities" in monster_data[key]:
            return False
        for ability in monster_data[key]["special_abilities"]:
            if ability["name"] == "Amphibious":
                return True
        return False

    # Remove sea creatures
    if (
        not "walk" in monster_data[key]["speed_json"]
        or monster_data[key]["speed_json"]["walk"] == 0
        or monster_data[key]["subtype"] == "merfolk"
        or monster_data[key]["name"] in blacklisted_sea_creatures
    ):
        return False

    if geolocation == "sky":
        if "fly" in monster_data[key]["speed_json"]:
            return True
        return False
    if geolocation == "land":
        return True
    return True


def monster_fits_previous_type(key: int, previous_type: str) -> bool:
    """determine if monster fits the previous geolocation type"""
    if previous_type == "":
        return True
    if monster_data[key]["type"] == previous_type:
        return True
    return False


def send_bad_request(text: str) -> _void:
    """Sends a bad request with the provided text"""
    return app.response_class(response=text, status=400, mimetype="application/text")


if __name__ == "__main__":
    app.run()
