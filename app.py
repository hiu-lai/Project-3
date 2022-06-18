from pymongo import MongoClient
from flask_pymongo import PyMongo
from flask import Flask
from flask import render_template, redirect
from bson import json_util
from bson.json_util import dumps, loads
import pandas
import json
import data_clean
import simplejson


#Specify string names inside '' for following variables 
MONGODB_HOST = 'localhost'
DBS_NAME = 'avocado_data'
COLLECTION_NAME_V = 'volume_data' 
COLLECTION_NAME_S = 'sales_data' 
#Specify numerical variable (default used)
MONGODB_PORT = 27017

#Specify variables in csv of interest
FIELDS_v = {'Week': True, 'Year': True, 'Status': True,'Total Volume': True, 'California': True,'Chile': True,'Mexico': True,'Peru': True,'Colombia': True, 'Dominican Republic': True,'WEDate': True,'_id': False}
FIELDS_S = {'City_x': True, 'Timeframe': True, 'Weekly Reporting Date': True,'Product Type': True, 'Average Avocado Price Year': True,'Small/Medium (4046) Units': True,'Large (4225) Units': True,'Extra Large (4770) Units': True,'Bulk GTIN': True, 'Bagged Units': True,'Total Units': True, 'Year': True, 'State': True, 'lat':True, 'lon': True, 'Region': True, 'abbreviation': True, '_id': False}

app = Flask(__name__)
mongo = PyMongo(app, uri="mongodb://localhost:27017/avocado_data")

@app.route("/")
def index():
    return render_template("Ramana_Sales.html")


@app.route("/avocado/volume")
def volume_file():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME_V]
    projects = collection.find(projection=FIELDS_v, limit=100000)
    #projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects

@app.route("/avocado/sales")
def sales_file():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME_S]
    projects = collection.find(projection=FIELDS_S, limit=100000)
    #projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    #json_projects = json.dumps(json_projects, default=json_util.default)
    json_projects = simplejson.dumps(json_projects, default=json_util.default, ignore_nan=True)
    connection.close()
    return json_projects

@app.route("/fetch_data")
def fetch_files():
    vol_data = data_clean.volume_file()
    total_sold = data_clean.total_file()
    # mongo.db.collection.update_one({}, {"$set": vol_data}, upsert=True)
    result_S = mongo.db.sales_data.delete_many({})
    result_V = mongo.db.volume_data.delete_many({})

    mongo.db.volume_data.insert_many(vol_data)
    mongo.db.sales_data.insert_many(total_sold)
    # Redirect back to home page
    return redirect("/")

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8000,debug=True)

# import json
# from flask import Flask, render_template, redirect
# from flask_pymongo import PyMongo
# from bson.json_util import dumps, loads
# import data_clean

# app = Flask(__name__)
# mongo = PyMongo(app, uri="mongodb://localhost:27017/avocado_data")

# @app.route("/")

# def home ():
    
#     avocado_sales = mongo.db.sales_data.find()
#     avocado_volume= mongo.db.volume_data.find()

#     sales_data = list(avocado_sales)
#     volume_data = avocado_volume

#     json_data_s = dumps(sales_data, indent =2)
#     json_data_v = dumps(volume_data, indent =2)
#     cursor = mongo.db.volume_data.find()
#     # with open('static/geojson/sales_data.json', 'w') as file:
#     #     file.write(json_data_s)
#     with open('static/geojson/volume_data.json', 'w') as file:
#         file.write('[')
#         for document in cursor:
#             file.write(dumps(document))
#             file.write(',')
#         file.write(']')

#     return render_template("index.html")

# @app.route("/volume_data")
# def volume_file():

#     vol_data = data_clean.volume_file()

#     # total_sold = data_clean.total_file()

#     # mongo.db.collection.update_one({}, {"$set": vol_data}, upsert=True)
#     # Remove all data
#     mongo.db.volume_data.delete_many({})

#     # Insert data into collection
#     mongo.db.volume_data.insert_many(vol_data)

#     # Redirect back to home page
#     return redirect("/")

# @app.route("/sales_data")
# def sales_file():
#     # vol_data = data_clean.volume_file()

#     total_sold = data_clean.total_file()

#     # mongo.db.collection.update_one({}, {"$set": vol_data}, upsert=True)
#     # Remove all data
#     mongo.db.sales_data.delete_many({})

#     # Insert data into collection
#     mongo.db.sales_data.insert_many(total_sold)

#     # Redirect back to home page
#     return redirect("/")

# if __name__ == "__main__":
#     app.run(debug=True)
