import json
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from bson.json_util import dumps, loads
import data_clean

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/avocado_data")

@app.route("/")

def home ():
    # avocado_data = mongo.db.collection.find_one()

    avocado_data = mongo.db.volume_data.find()
    list_data = list(avocado_data)

    json_data = dumps(list_data, indent =2)

    with open('data.json', 'w') as file:
        file.write(json_data)

    return render_template("index.html", avocado_data = avocado_data)

@app.route("/data_clean")
def volume_file():
    vol_data = data_clean.volume_file()

    total_sold = data_clean.total_file()

    # mongo.db.collection.update_one({}, {"$set": vol_data}, upsert=True)
    # Remove all data
    mongo.db.volume_data.delete_many({})

    # Insert data into collection
    mongo.db.volume_data.insert_many(vol_data)
    mongo.db.volume_data.insert_many(total_sold)

    # Redirect back to home page
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
