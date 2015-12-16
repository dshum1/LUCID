# Sentiment Analysis 

# this file is just for testing 

import requests

r_post = requests.post("http://text-processing.com/api/sentiment/", data = {"text" : "not too bulky"})
r_json = r_post.json()

label = r_json['label']
neg = r_json['probability']['neg']
pos = r_json['probability']['pos']
neut = r_json['probability']['neutral']

print r_json
print "label : " + label
print "neg   : " + str(neg)
print "pos   : " + str(pos)
print "neut  : " + str(neut)