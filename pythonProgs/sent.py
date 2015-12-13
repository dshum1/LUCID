# Sentiment Analysis 

import requests

# r_get = requests.get('https://api.github.com/events')

r_post = requests.post("http://text-processing.com/api/sentiment/", data = {"text" : "terrible"})

print r_post.json()