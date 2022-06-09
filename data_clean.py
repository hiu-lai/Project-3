# Import Dependencies
import pandas as pd
import os, fnmatch

# Looking for files
def volume_file():

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

    # Number of files found starting with "Volume" in filename
    numfile = len(resourcesVFiles)

    # Load Volume into dfs
    for i in range(len(resourcesVFiles)):
        file = resourcesVFiles[i]
        i = i + 1
        variable_name = f"vol_{i}"
    #     print(variable_name)
        globals()[variable_name] =  pd.read_csv(file)

    # Union Join dfs
    if numfile == 3:
        volume_temp = pd.concat([vol_1, vol_2])
        volume = pd.concat([volume_temp, vol_3])
    elif numfile == 2: 
        volume = pd.concat([vol_1, vol_2])
    else:
        volume == vol_1

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

    actual_vol = volume_transformed.loc[(volume_transformed["Status"] == "Actual"), :]

    return actual_vol

