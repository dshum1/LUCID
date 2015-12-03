/*******************
 Lucid popup window	
 *******************/

$(document).ready( function(){
    $("#btn1").click( function(){
      	getCurrentTabUrl(function(target_url) {
	        window.myParser = function(data){
	            console.log("success!");
	        };
	        $.ajax({
				type: 'GET',
				url: 'http://localhost:8080/amazon_prod/'+target_url,
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'myParser',
				success:
	            function (data, textStatus, jqXHR) {
	            	var parsed_reviews = data['revs'];
	            	var reviews = [];
	            	var two_gram = data['revs']['2-gram'];
	            	var three_gram = data['revs']['3-gram'];
	            	var four_gram = data['revs']['4-gram'];
	            	for (i = 0; i < two_gram.length; i++)
	            		reviews.push(two_gram[i]['words']);
	            	for (i = 0; i < three_gram.length; i++)
	            		reviews.push(three_gram[i]['words']);
	            	for (i = 0; i < four_gram.length; i++)
	            		reviews.push(four_gram[i]['words']);	            	
	            	document.getElementById('4-gram').innerHTML = reviews;

	                document.getElementById('urlTarget').innerHTML = data['url'];
	            },
	            error:
	            function (jqXHR, textStatus, errorThrown) {
	                document.getElementById('status').textContent = textStatus;
	            }
	        });
      	});
    });
});

/* Get the current URL */
function getCurrentTabUrl(callback) {

	// query filter to select the user's active tab
	var queryInfo = {
		active: true,
    	currentWindow: true
  	};
  	
	chrome.tabs.query(
		queryInfo, 
		function(tabs) {
			var tab = tabs[0];
			var url = tab.url;
			console.assert(typeof url == 'string', 'tab.url should be a string');
			callback(url);
		}
	);
}

function renderStatus(statusText) {
	document.getElementById('status').textContent = statusText;
}

function renderURL(text) {
	document.getElementById('urlTarget').innerHTML = text;
}

document.addEventListener('DOMContentLoaded', function() {
	getCurrentTabUrl(function(url) {
		// renderStatus('Call complete.');
		// renderURL("tab url: " + url);
	});
});














