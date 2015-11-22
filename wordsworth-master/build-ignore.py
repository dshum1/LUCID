# Build a list of words to ignore.
# Stores words in a json file:  ignore.json

import json

ignore_list = [
"the",
"and",
"of",
"a",
"I",
"an",
]

with open('ignore.json', 'w') as out_file:
	json.dump(ignore_list, out_file)