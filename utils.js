


function renderStatus(statusText) {
	document.getElementById('status').textContent = statusText;
}

// function renderURL(data) {
// 	document.getElementById('urlTarget').innerHTML = data['url'];
// }

function renderURLResult(data, status, jxXHR) {
	document.getElementById('urlTarget').innerHTML = data['url'];
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