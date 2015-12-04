/*******************
 Lucid popup window	
 *******************/

$(document).ready( function(){
    $("#btn1").click( function(){
      	getCurrentTabUrl(function(target_url) {
	        // window.myParser = function(data){
	        //     console.log("success!");
	        // };

	        document.getElementById('btn1').style.display = "none";
	        document.getElementById('status').textContent = "Reading Reviews...";

	        // Call Bottle server for reviews
	        $.ajax({
				type: 'GET',
				url: 'http://localhost:8080/amazon_prod/'+target_url,
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'myParser',
				success:
	            function (data, textStatus, jqXHR) {
	            	var parsed_reviews = data['revs'];
	            	var reviews2 = [];
	            	var reviews3 = []; 
	            	var reviews4 = [];
	            	var two_gram = data['revs']['2-gram'];
	            	var three_gram = data['revs']['3-gram'];
	            	var four_gram = data['revs']['4-gram'];
	            	for (i = 0; i < two_gram.length; i++)
	            		reviews2.push(two_gram[i]['words']);
	            	for (i = 0; i < three_gram.length; i++)
	            		reviews3.push(three_gram[i]['words']);
	            	for (i = 0; i < four_gram.length; i++)
	            		reviews4.push(four_gram[i]['words']);	


	            	document.getElementById('status').style.display = "none";

	            	document.getElementById('2-gram_para').textContent = reviews2;
	            	document.getElementById('3-gram_para').textContent = reviews3;
	            	document.getElementById('4-gram_para').textContent = reviews4;
	                // document.getElementById('urlTarget').textContent = data['url'];
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














