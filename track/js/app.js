var App = function() {
	"use strict";

	var xmlhttp = new XMLHttpRequest();
		
	xmlhttp.onreadystatechange = function() {
	
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	
	    	var data = JSON.parse(xmlhttp.responseText);

	    	console.log(data);
	
	    }
	}

	xmlhttp.open("GET", "https://api.aftership.com/v4/couriers/all")
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.setRequestHeader("aftership-api-key", "47e83220-c020-459e-a45e-4c73fcd9e564");

	return {
		send: function() {
			xmlhttp.send();
		}
	}
}();