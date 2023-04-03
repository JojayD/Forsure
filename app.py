from flask import Flask, send_from_directory, jsonify

app = Flask(__name__, static_folder="frontend/dist")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/get-time")
def get_time():
    return jsonify(getTime())

def getTime():
  return {'s': 'what'}


if __name__ == "__main__":
    app.run(debug=True)
