
var svgWidth = 960;
var svgHeight = 500;

var margin = {
	top: 20,
	right: 40,
	bottom: 60,
	left: 100
  };
  
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;
  
  // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
  var svg = d3.select(".chart")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight);
  
	var chartGroup = svg.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.top})`);

	
queue().defer(d3.json, "/avocado/volume")
    .defer(d3.json, "static/geojson/us-states.json")
    .await(makeGraphs);

function makeGraphs(error, volumeJson, statesJson) {
	console.log(volumeJson.values())
	//Clean projectsJson data
	var volume_data = volumeJson.values();
	// var dateFormat = d3.time.format("%Y-%m-%d");

	for (let d of volume_data) {
		// console.log(d['Year']);
	
	// volume_data.forEach(function(d) {
		// d["WEDate"] = dateFormat.parse(d["WEDate"]);
		// d["WEDate"].setDate(1);
		d["California"] = +d["California"];
		d["Chile"] = +d["Chile"];
		d["Colombia"] = +d["Colombua"];
		d["Dominican Republic"] = +d["Dominican Republic"];
		d["Mexico"] = +d["Mexico"];
		d["Peru"] = +d["Peru"];
		d["Total Volume"] = +d["Total Volume"];
		d['Year'] = +d['Year'];
		
	// });
	}
	var vol_2020 = volume_data.filter(d => d['Year'] == '2020')
	console.log(vol_20202)
	
	
}