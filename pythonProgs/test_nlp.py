import nlp
import json

# build review list from file
reviews_list = json.load(open('reviews.json'))

nlp.nlp_analyze(reviews_list, 4, 20, True)
