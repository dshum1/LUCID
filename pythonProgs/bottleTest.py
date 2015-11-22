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

# Accept Amazon URL path parameter
@app.route('/amazon_prod/<target_url:path>', method="GET")
def getReviews(target_url):

	# Scrape page for reviews
	print "[server] Gathering Reviews..."
	prod_url = target_url
	item_id = review_parser.get_item_id(prod_url)
	reviews = review_parser.get_reviews(item_id)

	# parse reviews. Outputs to stdout and a file
	print "[server] Analyzing Reviews..."
	parsed_reviews = nlp.nlp_analyze(reviews)

	d = json.dumps(dict(url=reviews))
	return 'myParser(' + d + ');'



# Start Server
if __name__ == '__main__':
	app.run(host='localhost', port=8080, debug=True)