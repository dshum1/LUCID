/*******************
 Lucid popup window	
 *******************/

    $(document).ready( function(){
      $("#btn1").click( function(){
        window.myParser = function(data){
          console.log('plz work');
        };
        $.ajax({
          type: 'GET',
          url: 'http://localhost:8080/amazon_prod/testing',
          dataType: 'jsonp',
          jsonp: 'callback',
          jsonpCallback: 'myParser',
          success:
            function (data, textStatus, jqXHR) {
              document.getElementById('urlTarget').innerHTML = data['url'];
            },
          error:
            function (jqXHR, textStatus, errorThrown) {
              document.getElementById('status').textContent = textStatus;
            }
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

function sendGetRequest(url, callback) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
    		callback(xhttp.responseText);
		}
		// debuggery
		else if (xhttp.readyState == 4 && xhttp.status != 200) {
			renderURL("readyState = " + xhttp.readyState + ", status = " + xhttp.status);
		}

	}
	xhttp.open("GET", url, true);
	xhttp.send();
}

document.addEventListener('DOMContentLoaded', function() {
	getCurrentTabUrl(function(url) {
		// this is a simple dumby python file that should make a file <test.txt> and print out stuff
		renderStatus('calling localhost:8080');

		// sendGetRequest("http://localhost:8080/amazon_prod/" + url, renderURL)

		/////////
		$.ajax({
			type: "GET",
		  	url: "http://localhost:8080/amazon_prod/" + url,
		  	success: renderURL("successful ajax call")
		});


		/////////// 
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 0) {
		    	renderURL(xhttp.responseText);
			}
		}
		xhttp.open("GET", "http://localhost:8080/amazon_prod/" + url, true);
		// xhttp.send("amazon_prod/" + url);
		xhttp.send();


		/////////// Wut is going on
		// function httpGetAsync(url, callback) {
		//     var xmlHttp = new XMLHttpRequest();
		//     xmlHttp.onreadystatechange = function() { 
		//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		//             callback(xmlHttp.responseText);
		//     }
		//     xmlHttp.open("GET", url, true); // true for asynchronous 
		//     xmlHttp.send(null);
		// }




		renderStatus('Call complete.');
		// renderURL("tab url: " + url);
	});
});














