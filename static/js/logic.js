function makeResponsive() {

var queryUrl ="/avocado/map_data";
// Perform a GET request to the query URL
d3.json(queryUrl).then(function(map_data) {
  // function init() {
  //   getData();

  // }

	var parseTime = d3.timeParse("%d-%m-%Y");
	var newDateFormat = d3.timeFormat("%d-%b");
	var sortDate = d3.timeFormat("%Y-%m-%d");
	// var monthFormat = d3.timeFormat("%m");

	// Cast the hours value to a number for each piece of tvData
	map_data.forEach(function(data) {
	  data.small = +data['4046 Units'];
	  data.large = +data['4225 Units'];
	  data.xl = +data['4770 Units'];
	  data.bulkGTIN = +data['Bulk GTIN'];
	  data.BaggedUnits = +data['Total Bagged Units']
	  data.TotalUnits = +data['Total Bulk and Bags Units']
	});

	// console.log(data.months)
	  // setup buttons
  
	  // d3.select("#first_year").on("click", getData);
	  // d3.select("#second_year").on("click", getData);
	  // d3.select("#third_year").on("click", getData);
	  
	  // function getData() {
  
		// if (this.id == "first_year"){
		//   var selYear = '2020';
		// }
		// else if (this.id == "second_year") {
		//   var selYear = '2021';
		// }
		// else {
		  var selYear = '2022';
		// }
  
		var chosenYear = map_data.filter(d => d.Year == '2022');
		var chosenYear = chosenYear.filter(d => d.State != "Total");  
//     console.log(chosenYear)
//     createFeatures(chosenYear)
// }});

//   function createFeatures(chosenYear) {
   
 
    var cityMarkers = [];
    chosenYear.forEach(function(data, i){

     cityMarkers.push(
        L.circle([data.lat, data.lon], {
          storke: false,
          fillOpacity: 0.75,
          color: "red",
          fillcolor: "red",
          radius: data.TotalUnits/100
        })
      )
    })
    
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });

    // Create two separate layer groups: one for cities and one for states
    // var territories = L.layerGroup(territoryMarkers);
    var cities = L.layerGroup(cityMarkers);

    // Create a baseMaps object
    var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
    };

  

    // Define a map object
    var myMap = L.map("map", {
      center: [37.8, -96],
      zoom: 4.5,
      layers: [streetmap, cities]
    });

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, {
      collapsed: false
    }).addTo(myMap);
    init();
})
}
makeResponsive();

d3.select(window).on("resize", makeResponsive);