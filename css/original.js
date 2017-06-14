// function app() {

// 	var appId = "221cce2f";
// 	var appKey = "d209929236fc97196775650c2bdb639e";
// 	// for transport api
// 	var accessToken = "c8eebaa7-d421-4025-bb02-989cc9c53b39";

// 	// change to https
// 	if (window.location.protocol != 'https:') window.location.protocol = 'https';

// 	// geolocation is successfull
// 	function success(position) {

// 		// declare users coordinates
// 		var userLat = position.coords.latitude;
// 		var userLon = position.coords.longitude;

// 		locationSuccess(userLat, userLon);

// 	}

// 	// geolocation not working
// 	function error() {

// 		// console.log("Geolocation not supported.");

// 	}

// 	navigator.geolocation.getCurrentPosition(success,error);

// 	function locationSuccess(userLat, userLon) {

// 		// log users coordinates
// 		// console.log("User Coordinates: " + userLat + "," + userLon);

// 		// api url
// 		var stationsUrl = "https://data.gov.uk/data/api/service/transport/naptan_railway_stations/nearest?lat=" + userLat + "&lon=" + userLon;

// 		// api request to find closest station
// 		var stationsReq = new XMLHttpRequest();

// 		// open request for closest stations
// 		stationsReq.open('GET', stationsUrl, true);

// 		// run function on load
// 		stationsReq.onload = function() {

// 			// if reuqest is between 200 & 399
// 			if (this.status >= 200 && this.status < 400) {

// 				// declare variable for response text
// 				var stationsRes = JSON.parse(stationsReq.responseText);

// 				// loop through data
// 				for (var i = 0; i < 5; i++) {

// 					// declare variable for station data
// 					var stationData = stationsRes.result;

// 					// // console.log(stationData[i]);

// 					// declare variables for the strings, station name, code and coords
// 					var stationName = stationData[i].stationname.replace("Rail Station", "").trim();
// 					var stationCode = stationData[i].crscode;
// 					var stationCoords = stationData[i].latlong.coordinates;

// 					// log station name, code and coords
// 					// console.log("Name: " + stationName + " | Code: " + stationCode + " | Coordinates: " + stationCoords[1] + "," + stationCoords[0] + " | Transit Time: " + "n/a");

// 					// declare variables for the closest stations container for the buttons and a template for the button for closest stations
// 					var closestButtonContainer = document.getElementById("closest-stations");
// 					var buttonTemplate = "<button class='closest-stations-button button' data-code='" + stationCode + "'>" + "<span class='nr-logo'></span><span>" + stationName + "</span><span></span>" + "</button>";

// 					// add the buttons to the container
// 					closestButtonContainer.innerHTML += buttonTemplate;
// 				}

// 			} else {

// 				// console.log("There is an error.")
// 			}

// 			// declare variables for the buttons and origin input field
// 			var stationsButtons = document.querySelectorAll(".closest-stations-button");
// 			var originInput = document.getElementById("origin-input");
// 			var destinationInput = document.getElementById("destination-input");

// 			// loop to add event listener to the station buttons
// 			for(var i = 0; i < 5; i++) {

// 				stationsButtons[i].addEventListener("click", addCodeToOrigin);
// 			}

// 			//declare variable for the closest stations container
// 			var closestStationsContainer = document.getElementById("closest-stations-wrapper");

// 			// run function when button is clicked
// 			function addCodeToOrigin(e) {

// 				// variable to get the station code in the data-code object
// 				var target = e.currentTarget.dataset.code;

// 				// log to // console
// 				// console.log(target)

// 				// prevent button from refreshing page
// 				e.preventDefault();

// 				// clears placeholder text and adds the station code for button pressed
// 				originInput.setAttribute("placeholder", "");
// 				originInput.value = "";
// 				originInput.value = target;

// 				// add hidden class to the container to hide when clicked
// 				closestStationsContainer.classList.add("hidden");
// 			}

// 			// add event listener to origin input element
// 			// originInput.addEventListener("click", showClosestStations);

// 			// function to hide the closest stations container when origin input is clicked
// 			function showClosestStations(e) {

// 				// add hidden class
// 				closestStationsContainer.classList.remove("hidden");
// 			}
// 		}

// 		stationsReq.send();

// 		var submitButton = document.getElementById("submit-button");

// 		// searchButton.addEventListener("click", searchTimetable);

// 		function searchTimetable(e) {

// 			// prevent page from refreshing
// 			e.preventDefault();

// 			// variables for origin and destination input
// 			var originInput = document.getElementById("origin-input");
// 			var destinationInput = document.getElementById("destination-input");

// 			// variables to get the strings from the form
// 			var originValue = originInput.value.toUpperCase();
// 			var destinationValue = destinationInput.value.toUpperCase();

// 			// variable to store timetable-container in dom
// 			var timetableContainer = document.getElementById("timetable-container");

// 			// clear the inner html of timetable-container
// 			timetableContainer.innerHTML = "";

// 			// else if to check if origin code is correct/incorrect
// 			// if(originValue.length < 3) {

// 			// 	// console.log("Less than three letters. Origin code invalid.");

// 			// 	originInput.classList.add("input-error");

// 			// 	timetableContainer.innerHTML += "<p>Less than three letters. Origin code invalid.</p>";


// 			// } else if(originValue.length > 3) {
// 			// 	// console.log("More than three letters. Origin code invalid");

// 			// 	originInput.classList.add("input-error");

// 			// 	timetableContainer.innerHTML += "<p>More than three letters. Origin code invalid.</p>";

// 			// } else if (originValue.length === 3 && destinationValue === 3) {

// 			// 	// console.log("Correct amount of letters. Origin code is valid.");

// 			// 	timetableContainer.innerHTML = "Show the timetable for trains from " + originValue + " to " + destinationValue;

// 			// 	 if (originInput.classList.contains("input-error")) {

// 			// 		originInput.classList.remove("input-error");
// 			// 	}

// 			// 	timetableContainer.innerHTML = "Show the timetable for trains from " + originValue + " to " + destinationValue;
// 			// }

// 			// // else if to check if origin code is correct/incorrect
// 			// if (destinationValue.length < 3 ) {

// 			// 	// console.log("Less than three letters. Destination code invalid.");

// 			// 	destinationInput.classList.add("input-error");

// 			// 	timetableContainer.innerHTML += "<p>Less than three letters. Destination code invalid.</p>";

// 			// } else if (destinationValue.length > 3) {

// 			// 	// console.log("More than three letters. Destination code invalid.");

// 			// 	destinationInput.classList.add("input-error");

// 			// 	timetableContainer.innerHTML += "<p>More than three letters. Destination code invalid.</p>";

// 			// } else if (destinationValue.length === 3 && originValue.length === 3) {

// 			// 	// console.log("Correct amount of letters. Destination code valid.");

// 			// 	timetableContainer.innerHTML = "You searched for trains from " + originValue + " to " + destinationValue;

// 			// 	if (destinationValue.classList.contains("input-error")) {

// 			// 		destinationInput.classList.remove("input-error");

// 			// 	}
// 			// }

// 			// api url for ajax request
// 			var natRailApiUrl = "https://track-5.apphb.com/departures/" + originValue + "/100?accessToken=" + accessToken;
// 			// var transportApiUrl = "https://transportapi.com/v3/uk/train/station/" + originValue + "/live.json?app_id=" + appId + "&app_key=" + appKey + "&darwin=true&destination=" + destinationValue + "&train_status=passenger";

// 			// console.log(transportApiUrl)

// 			// declare new ajax request
// 			var timetableReq = new XMLHttpRequest();

// 			// open request
// 			timetableReq.open('GET', natRailApiUrl, true);

// 			// on load, run this function
// 			timetableReq.onload = function() {

// 				// if status is between 200 and 399 run code:
// 				if (this.status >= 200 && this.status < 400) {
// 				// Success!

// 				// variable for the response text
// 				var timetableData = JSON.parse(timetableReq.responseText);

// 				// log the response text
// 				// console.log(timetableData)

// 				// variable to enter the array in response text
// 				var timetableDepartures = timetableData.trainServices;

// 				// console.log(timetableDepartures);

// 				var currentStation = timetableData.locationName;
// 				var currentStationCode = timetableData.crs;

				

// 						var timetableContainer = document.getElementById("timetable-container");

// 				for (var i = 0; i < timetableDepartures.length; i++) {

// 					//console.log(timetableDepartures[i])

// 					var serviceOrigin = timetableDepartures[i].origin[0].locationName;
// 					var serviceOriginCode = timetableDepartures[i].origin[0].crs;
// 					var serviceDestination = timetableDepartures[i].destination[0].locationName;
// 					var serviceDestinationCode = timetableDepartures[i].destination[0].crs;
// 					var serviceScheduledDeparture = timetableDepartures[i].std;
// 					var serviceStatus = timetableDepartures[i].etd;
// 					var currentPlatform = timetableDepartures[i].platform;
// 					var serviceOperator = timetableDepartures[i].operator;
// 					var serviceVia = timetableDepartures[i].destination[0].via;
// 					var serviceId = timetableDepartures[i].serviceID;

// 					console.log("Departing from " + currentStation + " (" + currentStationCode + ") at " + serviceScheduledDeparture + ", expected departure is: " + serviceStatus + " Departing from platform " + currentPlatform + ", travelling " + serviceVia + " heading to " + serviceDestination + " (" + serviceDestinationCode + "). This service is operated by " + serviceOperator + " ServiceID: " + serviceId);

// 					var trainServiceTemplate =
// 						"<div class='stations'><div class='current-station'>" + currentStationCode + "</div><div class='route'></div><div class='destination'>" + serviceDestinationCode + "</div></div>"
// 						+ "<div class='times'><div class='current-station-time'>" + serviceScheduledDeparture + "</div><div class='route'></div><div class='destination'>" +  + "</div></div>";







// 						//   "<div class='train-service'>"
// 						// + serviceId + ">"
// 						// + "<p>" + serviceOrigin + " - "
// 						// + serviceDestination + " - "
// 						// + currentPlatform + " - "
// 						// + serviceOperator + " - "
// 						// + serviceScheduledDeparture + " - "
// 						// + serviceScheduledDeparture + " - "
// 						// + serviceStatus + " - "
// 						// + serviceId
// 						// + "</p></div>";

// 					timetableContainer.innerHTML += trainServiceTemplate;
					

// 				}


// 				// var stationInfo = timetableData.station_name;
	

// 				// timetableContainer.innerHTML += "Trains from " + stationInfo;

// 				// // // console.log(timetableDepartures);

// 				// for (var i = 0; i < timetableDepartures.length; i++) {

// 				// 	// console.log(timetableDepartures[i])

// 				// 	var serviceOrigin = timetableDepartures[i].origin_name;
// 				// 	var serviceDestination = timetableDepartures[i].destination_name;
// 				// 	var servicePlatform = timetableDepartures[i].platform;
// 				// 	var serviceOperator = timetableDepartures[i].operator_name;
// 				// 	var expectedDepartTime = timetableDepartures[i].expected_departure_time;
// 				// 	var aimedDepartTime = timetableDepartures[i].aimed_departure_time.trim();
// 				// 	var serviceStatus = timetableDepartures[i].status;
// 				// 	var serviceId = timetableDepartures[i].service;

// 				// 	var trainServiceTemplate = "<div class='service-info' data-serviceid='"
// 				// 		+ serviceId + "' data-servicetime='"
// 				// 		+ aimedDepartTime + "'>"
// 				// 		+ "<p>" + serviceOrigin + " - "
// 				// 		+ serviceDestination + " - "
// 				// 		+ servicePlatform + " - "
// 				// 		+ serviceOperator + " - "
// 				// 		+ expectedDepartTime + " - "
// 				// 		+ aimedDepartTime + " - "
// 				// 		+ serviceStatus + " - "
// 				// 		+ serviceId
// 				// 		+ "</br>"
// 				// 		// + "<span class='calling-points' id='calling-points'>xxx</span>"
// 				// 		+ "</p></div>";

// 				// 	timetableContainer.innerHTML += trainServiceTemplate;
// 				// }

// 				// 	var serviceInfoContainer = document.querySelectorAll(".service-info");

// 				// 	for (var i = 0; i < serviceInfoContainer.length; i++) {
// 				// 		serviceInfoContainer[i].addEventListener("click", getServiceInfo);
// 				// 	}

// 				// 	function getServiceInfo(e) {

// 				// 		var target = e.target.parentNode;

// 				// 		if(target === document.getElementsByTagName("span")) {
// 				// 			var target = e.target.parentNode.parentNode.parentNode;
// 				// 		}

// 				// 		var targetServiceId = e.currentTarget.dataset.serviceid;
// 				// 		var targetServiceTime = e.currentTarget.dataset.servicetime;
// 				// 		var theDate = new Date();
// 				// 		var theDateString = "";

// 				// 		console.log(target)

// 				// 		var fullDate = theDate.getFullYear() + '-' + ('0' + (theDate.getMonth()+1)).slice(-2) + '-' + ('0' + theDate.getDate()).slice(-2);

// 				// 	 	var transportApiServiceUrl = "https://transportapi.com/v3/uk/train/service/" + targetServiceId + "/" + fullDate + "/" + targetServiceTime + "/timetable.json?app_id=" + appId + "&app_key=" + appKey +"&darwin=true&live=false";

// 				// 		console.log("Date: " + fullDate + " | ID: " + serviceId + " | Time: " + targetServiceTime + " | URL: " + transportApiServiceUrl);

// 				// 		var serviceInfoReq = new XMLHttpRequest();

// 				// 		serviceInfoReq.open('GET', transportApiServiceUrl, true);

// 				// 		serviceInfoReq.onload = function() {
// 				// 			if (this.status >= 200 && this.status < 400) {
// 				// 			var serviceInfoData = JSON.parse(serviceInfoReq.responseText);
// 				// 			console.log(serviceInfoData);

// 				// 			// if (target)




// 				// 		} else {

// 				// 		}
// 				// 	};

// 				//serviceInfoReq.onerror = function() {
// 				// There was a connection error of some sort
// 			//};

// 			// serviceInfoReq.send();


					





					

// 					// 	var targetServiceId = e.currentTarget.dataset.serviceid;
// 					// 	var targetServiceTime = e.currentTarget.dataset.servicetime;

// 					// 	var theDate = new Date();
// 					// 	var theDateString;

// 					// theDate.setDate(theDate.getDate());

// 					// fullDate = theDate.getFullYear() + '-' + ('0' + (theDate.getMonth()+1)).slice(-2) + '-' + ('0' + theDate.getDate()).slice(-2);

// 					// 	// console.log(fullDate);
// 					// 	// console.log(targetServiceId);
// 					// 	// console.log(targetServiceTime);

// 					// 	var transportApiServiceUrl = "https://transportapi.com/v3/uk/train/service/" + targetServiceId + "/" + fullDate + "/" + targetServiceTime + "/timetable.json?app_id=" + appId + "&app_key=" + appKey +"&darwin=true&live=false";

// 					// 	// console.log(transportApiServiceUrl);

// 					// 	var serviceInfoReq = new XMLHttpRequest();

// 					// 	serviceInfoReq.open('GET', transportApiServiceUrl, true);

// 					// 	serviceInfoReq.onload = function() {
// 					//  		if (this.status >= 200 && this.status < 400) {
// 					// 		// Success!
// 					// 		var serviceInfoData = JSON.parse(serviceInfoReq.responseText);

// 					// 		var serviceCallingPoints = serviceInfoData.stops;

// 					// 		var callingPointsArray = [];

// 					// 		for (var key in serviceCallingPoints) {

// 					// 			var callingStations = serviceCallingPoints[key].station_name;

// 					// 			callingPointsArray.push(callingStations);
// 					// 		}

// 					// 		var callingPointsString = "";
// 					// 		var callingPointsContainer = document.getElementById("calling-points");

// 					// 		for(var i = 0; i < callingPointsArray.length; i++) {

// 					// 			callingPointsString += callingPointsArray[i] + ", ";

// 					// 		}


// 					// 		callingPointsContainer.innerHTML = callingPointsString;
// 					// 		// callingPointsContainer.classList.add("active");

// 					// 		// if(callingPointsContainer.classList.contains("active")) {
// 					// 			// callingPointsContainer.classList.remove("active");
// 					// 		// }

// 					// 		// console.log(callingPointsString)

// 					// 	} else {
// 					// 	// We reached our target server, but it returned an error
// 			// 		 }
// 			// 	};

// 			// 	serviceInfoReq.onerror = function() {
// 			// 	// There was a connection error of some sort
// 			// };

// 			// serviceInfoReq.send();

// //					}

// 			//} else {

// 			// console.log("Error.");
// 		}
// 	};

// 	timetableReq.onerror = function() {
// 	// There was a connection error of some sort

// 	// console.log("Error")
// };

// timetableReq.send();
// 		}

// 		// declare variable for switch button
// 		// var switchButton = document.getElementById("switch-button");

// 		// add even listener to switch button to run the switchstations function
// 		// switchButton.addEventListener("click", switchStations);

// 		// switch stations function used to switch the values in the inout fields
// 		function switchStations(e) {

// 			// prevent button from refreshing page when clicked
// 			e.preventDefault();

// 			// declare target to get clicked element
// 			var target = e.target;
// 			// variables for origin and destination input
// 			var originInput = document.getElementById("origin-input");
// 			var destinationInput = document.getElementById("destination-input");

// 			// variables to get the strings from the form
// 			var originValue = originInput.value;
// 			var destinationValue = destinationInput.value;

// 			// clear the origin and destination input field value
// 			originInput.value = "";
// 			destinationInput.value= ""; 

// 			// place the destination value and 
// 			originInput.value = destinationValue;
// 			destinationInput.value = originValue;
// 		}

// 			var submitButton = document.getElementById("submit-button");

// 			submitButton.addEventListener("click", searchTimetable);

// 	}
// }

// window.onload = app();