from flask import Flask, jsonify, render_template, request, Response, send_from_directory
import os
import mimetypes

app = Flask(__name__)
mimetypes.init()
mimetypes.add_type("application/javascript", ".js", True)
mimetypes.add_type("image/vnd.microsoft.icon", ".ico", True)


@app.route('/')
def index():
    return send_from_directory("static/", "index.html")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    print(mimetypes.guess_type(path)[0])
    return send_from_directory("static/", path, mimetype=mimetypes.guess_type(path)[0])


if __name__ == "__main__":
    app.run()
