var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 150
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select(".volume_3_years")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
 
 d3.json("/avocado/volume").then(function(volume_data, err) {
    if (err) throw err;

	var dateFormat = d3.timeFormat("%Y-%m-%d");
	// console.log(dateFormat)
    volume_data.forEach(function(d){
		d['WEDate'] = dateFormat(d['WEDate']);
		d["California"] = +d["California"];
		d["Chile"] = +d["Chile"];
		d["Colombia"] = +d["Colombua"];
		d["Dominican Republic"] = +d["Dominican Republic"];
		d["Mexico"] = +d["Mexico"];
		d["Peru"] = +d["Peru"];
		d["Total Volume"] = +d["Total Volume"];
		d['Year'] = +d['Year'];
		// console.log(d['Week'])
	// });
	})
		
		var vol_2020 = volume_data.filter(d => d['Year'] == '2020');
		var vol_2021 = volume_data.filter(d => d['Year'] == '2021');
		var vol_2022 = volume_data.filter(d => d['Year'] == '2022');
		
		chosenYear = vol_2020;

		console.log(chosenYear)

		xTick = d3.extent(chosenYear, d => d['WEDate'])
		console.log(xTick)
		var xTimeScale = d3.scaleTime()
			.domain([d3.extent(chosenYear, d => d['WEDate'])])
			.range([height, 0]);
			
		var yLinearScale1 = d3.scaleLinear()
			.domain([0, d3.max(chosenYear, d => d['California'])])
			.range([height, 0]);

	
		var yLinearScale2 = d3.scaleLinear()
		.domain([0, d3.max(chosenYear, d => d['Chile'])])
		.range([height, 0]);
	
	  // Create axis functions
	var bottomAxis = d3.axisBottom(xTimeScale)
	.tickFormat(d3.timeFormat("%d-%b-%Y"));
	var leftAxis = d3.axisLeft(yLinearScale1);
	var rightAxis = d3.axisRight(yLinearScale2);

	// Add x-axis
	chartGroup.append("g")
	.attr("transform", `translate(0, ${height})`)
	.call(bottomAxis);

	// Add y1-axis to the left side of the display
	chartGroup.append("g")
	// Define the color of the axis text
	.classed("green", true)
	.call(leftAxis);

	// Add y2-axis to the right side of the display
	chartGroup.append("g")
	// Define the color of the axis text
	.classed("blue", true)
	.attr("transform", `translate(${width}, 0)`)
	.call(rightAxis);

	// Line generators for each line
	var line1 = d3.line()
	.x(d => xTimeScale(d['WEDate']))
	.y(d => yLinearScale1(d['California']));

	var line2 = d3.line()
	.x(d => xTimeScale(d['WEDate']))
	.y(d => yLinearScale2(d['Chile']));

	// Append a path for line1
	chartGroup.append("path")
	.data([chosenYear])
	.attr("d", line1)
	.classed("line green", true);

	// Append a path for line2
	chartGroup.append("path")
	.data([chosenYear])
	.attr("d", line2)
	.classed("line blue", true);

	// Append axes titles
	chartGroup.append("text")
	.attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
	// .classed("dow-text text", true)
	.text("Volume");

	chartGroup.append("text")
	.attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
	// .classed("smurf-text text", true)
	.text("Countries");
}).catch(function(error) {
	console.log(error);
});