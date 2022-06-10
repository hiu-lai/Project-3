from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import data_clean

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/avocado_data")

@app.route("/")

def home ():
    avocado_data = mongo.db.collection.find_one()

    return render_template("index.html", volume_data = avocado_data)

@app.route("/data_clean")
def volume_file():
    vol_data = data_clean.volume_file()

    # mongo.db.collection.update_one({}, {"$set": vol_data}, upsert=True)
    mongo.db.volume_data.insert_many(vol_data)

    # Redirect back to home page
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
