from flask import Flask ,send_from_directory ,jsonify ,request
from scrape import scrape_linkedin

app = Flask(__name__ ,static_folder = "frontend/dist")


@app.route("/" ,defaults = {"path": ""})
@app.route("/<path:path>")
def index(path):
    return send_from_directory(app.static_folder ,"index.html")


@app.route("/api/search")
def search():
    job_title = request.args.get("job_title" ,"")
    location = request.args.get("location" ,"")
    jobs = scrape_linkedin(job_title ,location)
    return jsonify(jobs)


if __name__ == "__main__":
    app.run(debug = True)
