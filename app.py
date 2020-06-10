from flask import Flask, jsonify, render_template, request, Response, send_from_directory
import os
import mimetypes
import json

app = Flask(__name__)
mimetypes.init()
mimetypes.add_type("application/javascript", ".js", True)
mimetypes.add_type("image/vnd.microsoft.icon", ".ico", True)


@app.route('/')
def index():
    return send_from_directory("static/", "index.html")


@app.route('/api/encounter/thresholds')
def threshholds():
    # THIS IS TEMPORARIRILY HARDCODED. STORE THIS IN POSTGRES LATER.
    # ALSO ADD LEVEL 11-20
    data = {
        1: {
            "easy": 25,
            "medium": 50,
            "hard": 75,
            "deadly": 100
        },
        2: {
            "easy": 50,
            "medium": 100,
            "hard": 150,
            "deadly": 200
        },
        3: {
            "easy": 75,
            "medium": 150,
            "hard": 225,
            "deadly": 400
        },
        4: {
            "easy": 125,
            "medium": 250,
            "hard": 375,
            "deadly": 500
        },
        5: {
            "easy": 250,
            "medium": 500,
            "hard": 750,
            "deadly": 1100
        },
        6: {
            "easy": 300,
            "medium": 600,
            "hard": 900,
            "deadly": 1400
        },
        7: {
            "easy": 350,
            "medium": 750,
            "hard": 1100,
            "deadly": 1700
        },
        8: {
            "easy": 450,
            "medium": 900,
            "hard": 1400,
            "deadly": 2100
        },
        9: {
            "easy": 550,
            "medium": 1100,
            "hard": 1600,
            "deadly": 2400
        },
        10: {
            "easy": 600,
            "medium": 1200,
            "hard": 1900,
            "deadly": 2800
        }
    }
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    print(mimetypes.guess_type(path)[0])
    return send_from_directory("static/", path, mimetype=mimetypes.guess_type(path)[0])


if __name__ == "__main__":
    app.run()
