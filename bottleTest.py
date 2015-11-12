###############################################################################
#
#  Bottle Test
#
###############################################################################

from bottle import Bottle, response, template
import json

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
	# return template('The url of the amazon product is {{url}}', url=target_url)
	# return bottle.HTTPResponse(status=200, body="foobar")
	# response.status = 200
	# response.content_type = 'text/plain'
	# return "foobar"
	d = json.dumps(dict(url=target_url))
	return 'myParser(' + d + ');'



# Start Server
if __name__ == '__main__':
	app.run(host='localhost', port=8080, debug=True)