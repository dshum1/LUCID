# Sentiment Analysis 

import requests

# r_get = requests.get('https://api.github.com/events')

r_post = requests.post("http://text-processing.com/api/sentiment/", data = {"text" : "terrible"})
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