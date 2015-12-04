###############################################################################
#
#  Bottle Test
#
###############################################################################

from bottle import Bottle, response, template
import json
import review_parser
import nlp

###############################################################################

app = Bottle()

# Testing
@app.route('/hello')
def hello():
    return "Hello World!"

# Testing URL parameters -> function arguments
@app.route('/')
@app.route('/hello/<name>')
def greet(name='Stranger'):
    return template('Yo {{name}}, wattup wattup?', name=name)

# Testing static file fetching
@app.route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./')

###############################################################################

# Amazon Page Review Summaries
@app.route('/amazon_prod/<target_url:path>', method="GET")
def getReviews(target_url):

	# Check if url has been cached. else scrape page for reviews
	###  !!!  does the parser return json or just text???
	try:
		print "[server] Gathering reviews from file..."
		
		######  Just some TEST shiz  #######
		with open('cached_reviews/iphone_case.json') as reviews_from_file:
			reviews = json.load(reviews_from_file)

		######  this is the real code  #######
		# # turn the given url into a file name. 
		# # (Files of cached reviews will be named after their url)
		# reviews_file = target_url.replace('/','_');
		# with open('cached_reviews/'+reviews_file) as reviews_from_file
		# reviews = json.load(reviews_from_file)

		print "[server] Success. Gathered reviews from file."


	# if reviews not cached, scrape Amazon page for reviews
	except: 
		# Scrape Amazon page for reviews
		print "[server] Gathering reviews from Amazon.com..."
		item_id = review_parser.get_item_id(target_url)
		reviews = review_parser.get_reviews(item_id)
		print "[server] Success. Scraped reviews from Amazon.com."

	# parse reviews. Outputs to stdout and a file
	print "[server] Analyzing reviews..."
	parsed_reviews = nlp.nlp_analyze(reviews, top_n=10)

	d = json.dumps(dict(url=target_url, revs=parsed_reviews))
	return 'myParser(' + d + ');'




# Start Server
if __name__ == '__main__':
	app.run(host='localhost', port=8080, debug=True)





