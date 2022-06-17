# Import Dependencies
import pandas as pd
import os, fnmatch
# from splinter import Browser
# from bs4 import BeautifulSoup as bs
import datetime as dt
# from webdriver_manager.chrome import ChromeDriverManager

def file_search():
    # Searching for csv filenames

    for root, dirs, files in os.walk("resources", topdown=False):
        resourcesVFiles = []
        resourcesRFiles = []
        resourcesTotFiles = []
        for name in files:
            if os.path.join(name).startswith("Volume"):
                resourcesVFiles.append(os.path.join(root, name))
            elif os.path.join(name).rfind("total"):
                resourcesTotFiles.append(os.path.join(root, name))
            else:
                resourcesRFiles.append(os.path.join(root, name))
    
    # Load all relevant filenames and path to a dictionary
    resourcesFile = {
        "volume_data": resourcesVFiles,
        "region_data": resourcesRFiles,
        "sales_tot_data": resourcesTotFiles
    }
    return  resourcesFile


def volume_file():

    resourcesVFiles = file_search()['volume_data']

    # List to store df names
    volumedf_list = []

    # Load Volume into dfs
    for i in range(len(resourcesVFiles)):
        file = resourcesVFiles[i]
        i = i + 1
        variable_name = f"vol_{i}"
        globals()[variable_name] =  pd.read_csv(file)
        volumedf_list.append(variable_name)

    # Union Join dfs
    volumedf_list = [vol_1, vol_2, vol_3]
    volume = pd.concat(volumedf_list, axis=0, ignore_index=True)

    # Replace N/A with zeros
    volume.fillna(0)

    for col in volume.columns:
        if not (col == 'Week' or col == 'Status' or col == 'Year'):
            try:
                volume[col] = volume[col].str.replace(",", "").astype(float)
            except AttributeError:
                print(f'skipped {col}')

    volume_transformed = volume.fillna(0)

    volume_transformed['WEDate'] = pd.to_datetime(volume_transformed.Week)

    actual_vol_temp = volume_transformed.loc[(volume_transformed["Status"] == "Actual"), :]
    actual_vol = actual_vol_temp.to_dict("records")
 
    # actual_vol

    return actual_vol

def total_file():

    # Extract filenames and Path or csv files relating to volume unit

    resourcesTotFiles = file_search()['sales_tot_data']

    # numfile = len(resourcesTotFiles)
    totaldf_list = []
    
    # Load Volume into dfs
    for i in range(len(resourcesTotFiles)):
        file = resourcesTotFiles[i]
        i = i + 1
        variable_name = f"tot_{i}"
        globals()[variable_name] =  pd.read_csv(file)
        totaldf_list.append(variable_name)

    # Union Join dfs
    totaldf_list = [tot_1, tot_2, tot_3]
    total_temp = pd.concat(totaldf_list, axis=0, ignore_index=True)

    # Replace N/A with zeros
    total_temp.fillna(0)
    
    rearrange_cols_df = total_temp[['Geography',
        'Timeframe',
        'Current Year Week Ending',
        'Type',
        'ASP Current Year',
        '4046 Units',
        '4225 Units',
        '4770 Units',
        'Bulk GTIN',
        'TotalBagged Units',
        'Total Bulk and Bags Units']]

    # Change dates columns to date 
    rearrange_cols_df['Current Year Week Ending'] = pd.to_datetime(rearrange_cols_df['Current Year Week Ending'])
    rearrange_cols_df['Year']=rearrange_cols_df['Current Year Week Ending'].dt.year
        
    # Rename columns
    rearrange_cols_df.columns = ['City', 'Timeframe', 'Weekly Reporting Date', 'Produce Type', 'Average Avocado Price Year', 'Small/Medium (4046) Units', 'Large (4225) Units', 'Extra Large (4770) Units', 'Bulk GTIN', 'Bagged Units', 'Total Units', 'Year'] 

    rearrange_cols_df[['s_city', 's_city_2']] = rearrange_cols_df.City.str.split(pat=chr(47), expand=True)

    # Adding 'State' & 'Region' to data
    hassboard_state = pd.read_csv("resources/hassboard_state.csv")
    new_df = rearrange_cols_df.merge(hassboard_state, left_on="City", right_on="h_city", how="left").drop(['s_city_2', 'h_city'], axis=1)

    # Adding Longitude & Latitude info

    cities_coord = pd.read_csv("resources/US_cities_coord.csv")
    data_complete_df = new_df.merge(cities_coord, left_on=["s_city", "h_state"], right_on=["City", "State"], how="left")
    # data_complete_df.drop(['s_city','h_state', 'City_y'], axis=1).rename(columns={'City_x': 'City'})

    total_sold = data_complete_df.to_dict('records')

    return total_sold