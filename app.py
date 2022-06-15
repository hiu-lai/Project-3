import json
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from bson.json_util import dumps, loads
import data_clean

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/avocado_data")

@app.route("/")

def home ():
    
    avocado_sales = mongo.db.sales_data.find()
    avocado_volume= mongo.db.volume_data.find()

    sales_data = list(avocado_sales)
    volume_data = list(avocado_volume)

    json_data_s = dumps(sales_data, indent =2)
    json_data_v = dumps(volume_data, indent =2)

    with open('sales_data.json', 'w') as file:
        file.write(json_data_s)
    with open('volume_data.json', 'w') as file:
        file.write(json_data_v)
    return render_template("index.html")

@app.route("/volume_data")
def volume_file():

    vol_data = data_clean.volume_file()

    # total_sold = data_clean.total_file()

    # mongo.db.collection.update_one({}, {"$set": vol_data}, upsert=True)
    # Remove all data
    mongo.db.volume_data.delete_many({})

    # Insert data into collection
    mongo.db.volume_data.insert_many(vol_data)

    # Redirect back to home page
    return redirect("/")

@app.route("/sales_data")
def sales_file():
    # vol_data = data_clean.volume_file()

    total_sold = data_clean.total_file()

    # mongo.db.collection.update_one({}, {"$set": vol_data}, upsert=True)
    # Remove all data
    mongo.db.sales_data.delete_many({})

    # Insert data into collection
    mongo.db.sales_data.insert_many(total_sold)

    # Redirect back to home page
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
