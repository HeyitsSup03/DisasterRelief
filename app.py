from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import networkx as nx

app = Flask(__name__)
CORS(app)

DATA_DIR = "data"
VILLAGE_FILE = os.path.join(DATA_DIR, "villages.json")
CENTER_FILE = os.path.join(DATA_DIR, "relief_centers.json")

def load_data(file):
    with open(file, "r") as f:
        return json.load(f)

def save_data(file, data):
    with open(file, "w") as f:
        json.dump(data, f, indent=2)

@app.route("/villages", methods=["GET"])
def get_villages():
    return jsonify(load_data(VILLAGE_FILE))

@app.route("/relief_centers", methods=["GET"])
def get_centers():
    return jsonify(load_data(CENTER_FILE))

@app.route("/add_village", methods=["POST"])
def add_village():
    data = request.json
    villages = load_data(VILLAGE_FILE)
    villages.append(data)
    save_data(VILLAGE_FILE, villages)
    return jsonify({"status": "village added"})

@app.route("/add_relief_center", methods=["POST"])
def add_center():
    data = request.json
    centers = load_data(CENTER_FILE)
    centers.append(data)
    save_data(CENTER_FILE, centers)
    return jsonify({"status": "center added"})

@app.route("/generate_plan", methods=["POST"])
def generate_plan():
    villages = load_data(VILLAGE_FILE)
    centers = load_data(CENTER_FILE)
    
    G = nx.Graph()

    for v in villages:
        G.add_node(v["name"], type="village", **v)
    for c in centers:
        G.add_node(c["name"], type="center", **c)

    for v in villages:
        for c in centers:
            dist = ((v["lat"] - c["lat"])**2 + (v["lon"] - c["lon"])**2)**0.5 * 111
            G.add_edge(v["name"], c["name"], weight=round(dist, 2))

    def find_by_name(data_list, name):
        for item in data_list:
            if item["name"] == name:
                return item
        return None

    routes = []
    for v in villages:
        best = None
        best_dist = float("inf")
        best_center = None
        for c in centers:
            try:
                path = nx.shortest_path(G, v["name"], c["name"], weight="weight")
                dist = nx.path_weight(G, path, weight="weight")
                if dist < best_dist:
                    best = path
                    best_dist = dist
                    best_center = c
            except:
                continue
        if best and best_center:
            routes.append({
                "village": v,             # include full village object
                "reliefCenter": best_center,  # include full center object
                "distance": round(best_dist, 2),
                "deliveries": v["needs"]
            })

    return jsonify(routes)


if __name__ == '__main__':
    app.run(debug=True)
