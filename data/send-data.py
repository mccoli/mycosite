import json
import csv

# open the csv file
with open('figure-2.csv', 'r') as csvfile:
    print("file opened successfully.")
    csvData = csv.reader(csvfile, delimiter=',')

    # extract the values into a flat 1D table
    data = []
    for row in csvData:
        # print(', '.join(row))
        # access individual numbers and remove whitespace
        for item in row:
            # print(item.strip())
            data.append(item.strip())

# print(data)
# turn data into json format so it can be used in JavaScript
data_json = json.dumps(data)
print("data converted to json.")

# read desired file's current contents
with open('../addons/datafield.js', 'r') as in_file:
    contents = in_file.read()

# open the file again in write mode to add the new values
with open('../addons/datafield.js', 'w') as mod_file:
    mod_file.write('const data = %s;\n\n' % data_json + contents)
    print("data sent.")
# send values to javascript