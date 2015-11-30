from amazon_scraper import AmazonScraper
import json
import re
import sys
import nlp

amzn = AmazonScraper("AKIAI2KDJUR74W4HWZEQ", "w9gYu178es+Q6K5U+Q9YXEVrkPg5jsVWmtqIXwAI", "lucid064")

# socks_url = "http://www.amazon.com/Hanes-Ultimate-Socks-White-10-13/dp/B00FBD2G0I/"

def get_item_id(url):
	m = re.search(r"\/dp\/\w+\/", url)
	if m:
		return m.group()[4:-1]
	else:
		print "error: can't get item id"

def get_reviews(item_id, num_reviews=10):
	p = amzn.reviews(ItemId=item_id)
	reviews = p.full_reviews()
	full_reviews = []
	counter = 0
	for r in reviews:
		if counter < num_reviews:
			full_reviews.append(r.text)
			counter = counter + 1
		else:
			break
	return full_reviews
	# out_file = open("reviews.json", "w")
	# json.dump(full_reviews,out_file)

if __name__ == "__main__":
	socks_url = sys.argv[1]
	item_id = get_item_id(socks_url)
	get_reviews(item_id)