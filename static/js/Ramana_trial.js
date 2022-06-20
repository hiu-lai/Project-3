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
	console.log(volumeJson)
	//Clean projectsJson data
	var volume_data = volumeJson;
	var dateFormat = d3.time.format("%Y-%m-%d");
	volume_data.forEach(function(d) {
		d["WEDate"] = dateFormat.parse(d["WEDate"]);
		d["WEDate"].setDate(1);
		d["California"] = +d["California"];
		d["Chile"] = +d["Chile"];
		d["Colombia"] = +d["Colombua"];
		d["Dominican Republic"] = +d["Dominican Republic"];
		d["Mexico"] = +d["Mexico"];
		d["Peru"] = +d["Peru"];
		d["Total Volume"] = +d["Total Volume"];
		d['Year'] = +d['Year'];
	});

	
};
















// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 80,
//   left: 150
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// var svg = d3
//     .select(".chart")
//     .append("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);


// -------------------------------------
// // queue()
// //     .defer(d3.json, "http://192.168.1.172:8000/avocado/sales")
// //     .await(csvToSeries);
// //     console.log()

// // function csvToSeries(error, text) {
// // console.log(text)
// //     text.forEach(function (row) {
/// ----------------------------------------------------
        
// d3.json("/avocado/sales").then(function(err, sales_data) {
//     if (err) throw err;

//     var parseTime = d3.timeParse("%d-%m-%Y");
//     var newDateFormat = d3.timeFormat("%d-%B-%Y");
//     var sortDate = d3.timeFormat("%Y-%m-%d");

//     sales_data.forEach(function(d){
//         d['Weekly Reporting Date'] = parseTime(d['Weekly Reporting Date'])
//         d['sWeekly Reporting Date'] = sortDate(d['Weekly Reporting Date'])
//         d['Weekly Reporting Date'] = newDateFormat(d['Weekly Reporting Date'])
////////////////////////////////
//         // d['WEDate'] = parseTime(d['WEDate'])
//         // d['sWEDate'] = sortDate(d['WEDate'])		
//         // d['WEDate'] = newDateFormat(d['WEDate'])
//////////////////////////////////
//         d['City_x'] = +d['City_x'];
//         d['Timeframe'] = +d['Timeframe'];
//         d['Weekly Reporting Date'] = +d['Weekly Reporting Date'];
//         d['Average Avocado Price Year'] = +d['Average Avocado Price Year'];
//         d['Small/Medium (4046) Units'] = +d['Small/Medium (4046) Units'];
//         d['Large (4225) Units'] = +d['Large (4225) Units'];
//         d['Extra Large (4770) Units'] = +d['Extra Large (4770) Units'];
//         d['Bulk GTIN'] = +d['Bulk GTIN'];
//         d['Bagged Units'] = d['Bagged Units'];
//         d['Total Units'] = +d['Total Units'];
//         d['Year'] = +d['Year'];
//         d['State'] = +d['State'];
//         d['lat'] = +d['lat'];
//         d['lon'] = +d['lon'];
//         d['Region'] = +d['Region'];

//////////////////////////////
//         // d["California"] = +d["California"];
//         // d["Chile"] = +d["Chile"];
//         // d["Colombia"] = +d["Colombua"];
//         // d["Dominican Republic"] = +d["Dominican Republic"];
//         // d["Mexico"] = +d["Mexico"];
//         // d["Peru"] = +d["Peru"];
//         // d["Total Volume"] = +d["Total Volume"];
//         // d['Year'] = +d['Year'];
///////////////////////////////
//     })

//     var vol_2020 = sales_data.filter(d => d['Year'] == '2020');
//     var vol_2021 = sales_data.filter(d => d['Year'] == '2021');
//     var vol_2022 = sales_data.filter(d => d['Year'] == '2022');

//     chosenYear = vol_2020;

//     var xTimeScale = d3.scaleTime()
//         // .domain([d3.extent(chosenYear, data => data['WEDate'])])
//         .domain([0, d3.max(chosenYear, data => data['sWeekly Reporting Date'])])
//         .range([0, width]);


//     var yLinearScale1 = d3.scaleLinear()
//         .domain([0, d3.max(chosenYear, data => data['Small/Medium (4046) Units'])])
//         .range([height, 0]);    


//     var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y-%m-%d"));
//     var leftAxis = d3.axisLeft(yLinearScale1);

//     chartGroup.append("g")
//         .attr("transform", `translate(0, ${height})`)
//         .call(bottomAxis);


//     chartGroup.append("g")
//     // Define the color of the axis text
//         .classed("green", true)
//         .call(leftAxis);

//     var line1 = d3.line()
//     .x(data => xTimeScale(data['sWeekly Reporting Date']))
//     .y(data => yLinearScale1(data['Small/Medium (4046) Units']));


//     chartGroup.append("path")
//         .data([chosenYear])
//         .attr("data", line1)
//         .classed("line green", true);


//     chartGroup.append("text")
//     .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
//     // .classed("dow-text text", true)
//     .text("Sales");


//     chartGroup.append("text")
//         .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
//         // .classed("smurf-text text", true)
//         .text("Product Type");

// }).catch(function(error) {
//      console.log(error)});
   




    