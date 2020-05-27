from flask import Flask, jsonify, render_template, request, Response

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("404.html")


if __name__ == "__main__":
    app.run()
