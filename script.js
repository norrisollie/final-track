// function to run on load
function app() {

	//////////////////////
	// START VARIABLES ///
	//////////////////////

	// closest stations wrapper
	var closestStationsWrapper = document.getElementById("closest-stations-wrapper");
	// closest stations div where the buttons go
	var closestStationsDiv = document.querySelector(".button-container");
	// submit button to search for timetables
	var submitButton = document.getElementById("submit-button");
	// container
	var containerHeader = document.getElementById("button-container");
	// form wrapper
	var formWrapper = document.getElementById("form-wrapper");
	// timetable results window close button
	var timetableResultsCloseButton = document.querySelector(".close-search-results-button");
	// timetable results container
	var timetableResultsContainer = document.querySelector(".search-results-container");
	// timetable results wrapper
	var timetableResultsWrapper = document.querySelector(".search-results-wrapper");
	// origin inout field
	var originInput = document.querySelector(".origin-input");

	////////////////////
	// END VARIABLES ///
	////////////////////

	// change to https to ensure geolocation works
	if (window.location.protocol != 'https:') window.location.protocol = 'https';

	// check if geolocation is supported
	// if not supported
	if(!navigator.geolocation) {
		console.log("This browser does not support supports GeoLocation.");
		return;
	// if supported
	} else if (navigator.geolocation) {
		console.log("This browser supports GeoLocation.");
	}
	

	// if geolocation works
	function locationSuccess(position) {

		console.log("GeoLocation is works, finding users location.");

		// declare variables for users latitude and longitude
		var userLatitude = position.coords.latitude;
		var userLongitude = position.coords.longitude;

		// callback function to run the success function
		success(userLatitude, userLongitude);

	}

	// if geolocation does not work
	function error() {

		console.log("Geolocation works, but could not find users location.");
	}

	// callback function to decide whether to run either success or error function
	navigator.geolocation.getCurrentPosition(locationSuccess,error);

	// function, needed to use the users latiude and longitude
	function success(userLatitude,userLongitude) {

		console.log("Coordinates: " + userLatitude + "," + userLongitude);

		// function to find closest stations
		function findClosestStations() {

			// ajax loader to show user something is loading
			// closestStationsWrapper.innerHTML += "<img class='loader'src='/img/loader.svg'>";

			// url to find closest stations
			var closestStationsUrl = "https://data.gov.uk/data/api/service/transport/naptan_railway_stations/nearest?lat=" + userLatitude + "&lon=" + userLongitude;

			// declare new request
			var closestStationsReq = new XMLHttpRequest();

			// open the request
			closestStationsReq.open('GET', closestStationsUrl, true);

			// run function when loading
			closestStationsReq.onload = function() {

				// run if status of request is between 300 and 399
				if (this.status >= 200 && this.status < 400) {

					// declare variable for response text
					var closestStationsRes = JSON.parse(closestStationsReq.responseText);

					// console.log(closestStationsRes);

					// declare variable to enter the array
					var closestStationsData = closestStationsRes.result;

					closestStationsDiv.innerHTML = "";

					// for loop to iterate through the array
					for (var i = 0; i < 5; i++) {

						// declare variables to get the station name and crs code
						var stationName = closestStationsData[i].stationname.replace("Rail Station", "").trim();
						var stationCrs = closestStationsData[i].crscode;
						var stationLatitude = closestStationsData[i].latlong.coordinates[1];
						var stationLongitude = closestStationsData[i].latlong.coordinates[0];

						console.log("Station Name: " + stationName + " | CRS: " + stationCrs + " | Coordinates: " + stationLatitude + "," + stationLongitude);

						// declare variable for the button template
						var closestStationsButtonTemplate = "<button class='closest-stations-button button' data-code='" + stationCrs + "'>" + "<span class='nr-logo'></span><span>" + stationName + "</span><span></span>" + "</button>";

						// add the buttons to the closest stations wrapper
						closestStationsDiv.innerHTML += closestStationsButtonTemplate;
						
					};

				} else {

					console.log("Server reached, but server returned an error.");

				}
			};

			// if there is an error with the request
			closestStationsReq.onerror = function() {

				console.log("There was a connection error.");

				// add text to show user there was an error
				closestStationsDiv.innerHTML = "<p>There was an error, unable to locate nearby stations</p>";

			};

			// send request
			closestStationsReq.send();

		}

		// run the find closest stations function
		findClosestStations();

		// add click event to submit-button
		submitButton.addEventListener("click", searchForTrains);

		// function for searching timetable using ajax request
		function searchForTrains(e) {

			// declare variable to find the target
			var target = e.target;

			// prevents page from refreshing when target is pressed
			e.preventDefault();

			// get the users input
			var originValue = originInput.value;

			console.log(originValue);

			// token for national rail api
			var accessToken = "c8eebaa7-d421-4025-bb02-989cc9c53b39";
			// declare variable for the api url string
			var natRailApiUrl = "https://track-5.apphb.com/departures/" + originValue + "/100?accessToken=" + accessToken;

			console.log(natRailApiUrl);

			// declare new xml http request
			var natRailApiReq = new XMLHttpRequest();

			// open the request
			natRailApiReq.open('GET', natRailApiUrl, true);

			// run this function on load
			natRailApiReq.onload = function() {

				// if request status is between 200 & 399, run code
  				if (this.status >= 200 && this.status < 400) {
    				// Success!
    				//declare varitable for the response text
    				var stationData = JSON.parse(natRailApiReq.responseText);

    				// declare variable for station name and code in the stationData response
    				var stationName = stationData.locationName;
    				var stationCode = stationData.crs;

    				console.log(stationName + " (" + stationCode + ")");
    				
    				// declare variable for the search station 
    				var searchResultsStation = document.querySelector(".search-station");

    				// add station name and code to departures from element
    				searchResultsStation.innerHTML = stationName + " (" + stationCode + ")";

    				// variable for delay info wrapper
    				var serviceDelayInfo = document.querySelector(".service-delay-info");

    				// variable to get the delay information
    				var delayInfo = stationData.nrccMessages;

    				// if else statement to see whether there are any issues.
    				if (delayInfo === null) {

    					// add delay info to delay info element 
    					serviceDelayInfo.innerHTML = "There is a good service. No issues reported.";

    				} else if (delayInfo != null) {

    					// declare new variable to get the string from the array
    					var delayInfo = stationData.nrccMessages[0].value;

    					// add delay information to delay info element
    					serviceDelayInfo.innerHTML = delayInfo;
    				}

            			// enter the trainServices array
    				var serviceInfo = stationData.trainServices;

    				var searchResultsServices = document.querySelector(".search-results-services");

            			searchResultsServices.innerHTML = "";

    				for(var i = 0; i < serviceInfo.length; i++) {
    					console.log(serviceInfo[i]);

    					var serviceOrigin = serviceInfo[i].origin[0].locationName;
						var serviceOriginCode = serviceInfo[i].origin[0].crs;
						var serviceDestination = serviceInfo[i].destination[0].locationName;
						var serviceDestinationCode = serviceInfo[i].destination[0].crs;
						var serviceScheduledDeparture = serviceInfo[i].std;
						var serviceStatus = serviceInfo[i].etd;
						var currentPlatform = serviceInfo[i].platform;
						var serviceOperator = serviceInfo[i].operator;
						var serviceId = serviceInfo[i].serviceID;
						var serviceVia = serviceInfo[i].destination[0].via;

						// if service status is on time/delayed/cancelled
						// if on time, run code
						if(serviceStatus === "On time") {

						// declare variable for service status span
						var serviceStatusSpan = document.querySelectorAll(".service-status");

						var serviceScheduledDeparture = '<span class="service-time time-status-span">' + serviceInfo[i].std + '</span>'
						var serviceStatus = "<span class='service-status time-status-span ontime'>" + serviceInfo[i].etd + "</span>"
						


						// if not on time, run code
						} else if (serviceStatus != "On time") {

							// redeclare variables
							var serviceScheduledDeparture = '<span class="service-time time-status-span linethrough">' + serviceInfo[i].std + '</span>'
							var serviceStatus = "<span class='service-status time-status-span delayed'>" + serviceInfo[i].etd + "</span>"
						
						}

						// if serviceVia is not provided
						if (serviceVia === null) {

							// change variable to empty string
							var serviceVia = "";

						} else if (serviceVia != null) {

							// keep variable the same
							var serviceVia = serviceInfo[i].destination[0].via;

						}


						// declare variable for service status span
						var serviceStatusSpan = document.querySelectorAll(".service-status");

						// if platform unavailable
						if (currentPlatform === null) {
							var currentPlatform = "unavailable"
						} else if (currentPlatform != null) {
							var currentPlatform = serviceInfo[i].platform;
						}

						var serviceInfoTemplate = '<div class="individual-service">'
    										+ '<div class="service-show-default">'
    										+ '<div class="service-time-wrapper">'
    										+ serviceScheduledDeparture
    										+ serviceStatus
    										+ '</div>'
    										+ '<div class="service-destination-wrapper">'
    										+ '<span class="service-destination service-destination-span">to ' + serviceDestination + ' ' + serviceVia + '</span>'
            								+ '<span class="service-platform service-destination-span">Platform ' + currentPlatform +'</span>'
            								+ '</div>'
            								+ '<div class="show-more-info"><button class="show-more-info-button">></button></div>'
            								+ '<div class="service-more-info-wrapper hidden">'
            								+ '<div class="show-click">'
            								+ '<div class="service-calling-points">'
            								+ '<span class="calling-points">{ calling points }</span>'
            								+ '</div>'
            								+ '<div class="service-operator-length">'
            								+ '<span class="service-journey-time">{ journey time }</span>'
            								+ '<span class="service-operator">Operated by ' + serviceOperator + '</span>'
            								+ '</div></div></div></div>';

            			// add button template to search results container
            			searchResultsServices.innerHTML += serviceInfoTemplate;

            			// remove hidden class to show timetable-results-wrapper (and container)
						timetableResultsWrapper.classList.remove("hidden");
						timetableResultsContainer.classList.remove("hidden");

    				}

    			} else {
    			// We reached our target server, but it returned an error
    			// remove hidden class to show timetable-results-wrapper (and container)
    			var errorMessage = document.querySelector(".error-message");

    			// add error message in to inner html
    			errorMessage.innerHTML = "<p>There is an error. Please try again.</p>";

    		}

    	};

    	// if there is an error, run this function
    	natRailApiReq.onerror = function() {
    	// There was a connection error of some sort

    	var errorMessage = document.querySelector(".error-message");

		// add error message in to inner html
		errorMessage.innerHTML = "<p>There is an error. Please try again.</p>";

    };

    // send the request
    natRailApiReq.send();

		}

		// add event listeners to the results container and close button
		timetableResultsCloseButton.addEventListener("click", closeTimetableSearchWindow);
		timetableResultsContainer.addEventListener("click", closeTimetableSearchWindow);

		// function to 'close' the results window
		function closeTimetableSearchWindow(e) {

			// declare variable for target
			var target = e.target;

			if(target === timetableResultsContainer) {

			// prevent page from refreshing when target is pressed
			e.preventDefault();

			// adds hidden class to 'hide' results
			timetableResultsWrapper.classList.add("hidden");
			timetableResultsContainer.classList.add("hidden");

		} else if(target === timetableResultsCloseButton) {

			// prevent page from refreshing when target is pressed
			e.preventDefault();

			// adds hidden class to 'hide' results
			timetableResultsWrapper.classList.add("hidden");
			timetableResultsContainer.classList.add("hidden");
		}

		}
	}
}

// run the app function
window.onload = app();


