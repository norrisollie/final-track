# Track - Version 2

## What is it?
Track is a small web application I designed and developed for my Final Major Project. I decided to continue on Track for my final major project, as I wanted to improve my knowledge of coding languages, such as HTML, CSS and Vanilla JavaScript. I also wanted to begin to learn how to use the Node JS platform to build and develop web apps, however I was unable to use Node JS for this project, however this project has allowed me to gain an understanding of how it works.

## How does it work?

Like version 1, version 2 of Track is also written in HTML, CSS and Vanilla Javascript. It works by using the navigator object, specifically using the geolocation property. This allows the application to access the user's latitude and longitude.

When the user's location has been found, a dynamic URL is created to access the NaPTAN API, using an AJAX request to fetch the data without reloading the page.

Once the data has been recieved, a for loop is used to access the first five stations in the array, as well as creating variables to access data such as the station name and CRS code. The station name and code is used to generate a table, with a row for each station.

When the closest stations have been found, a dynamic URL is created for each of the stations. This is used to access the timetable information for each station. Unlike in version 1, I decided to use the offical Network Rail API, however as it is a SOAP API, which returns XML data. This made it difficult to access the data as the API was not easy to access, in addition it is not CORs enabled, meaning that the browser would not allow a connection. I instead used an API called Huxley, which is a JSON proxy. This turns the data from XML in to JSON, which is a lot easier to use and manipulate. Once again, a for loop is used to access the timetable information for each station and create variable for each piece of information, such as the service origin, destination, departure time and platform, as well as other relevant information.

Once all of the required information has been fetched and manipulated, code is generated and inserted in to the containers for each station.
