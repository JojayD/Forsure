import json

from flask import Flask ,send_from_directory ,jsonify ,request ,make_response
from scrape import scrape_linkedin

app = Flask(__name__, static_folder="frontend/dist", static_url_path="")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    if path != "" and path != "api/search":
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


@app.route("/api/search")
def search():
    print('API received')
    job_title = request.args.get("job_title")
    location = request.args.get("location")
    jobs = scrape_linkedin(job_title, location)
    print("Jobs data:", jobs)  # Add this line to print the jobs data

    try:
        response = jsonify(jobs)
    except Exception as e:
        print("Error during jsonify:", e)
        response = make_response("Error during jsonify", 500)

    print(response)
    return response


def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', '*')
    return response

app.after_request(add_cors_headers)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
