# Sentiment Analysis 

# this file is just for testing 
# 


import requests

input_phrase = "awful"

r_post = requests.post("http://text-processing.com/api/sentiment/", data = {"text" : input_phrase})
r_json = r_post.json()

label = r_json['label']
neg = r_json['probability']['neg']
pos = r_json['probability']['pos']
neut = r_json['probability']['neutral']

# print r_json

print ""
print "input text: \"" + input_phrase + "\""
print "Probability Scores: "
print "  neg:  " + str(neg)
print "  pos:  " + str(pos)
print "  neut: " + str(neut)
print "Label: " + label
print ""