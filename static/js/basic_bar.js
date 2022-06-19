// Define SVG area dimensions
var svgWidth = 1160;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 50,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select(".volume_3_years")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.json("/avocado/volume").then(function(volume_data) {
  var parseTime = d3.timeParse("%d-%m-%Y");
  var newDateFormat = d3.timeFormat("%d-%b");
  var sortDate = d3.timeFormat("%Y-%m-%d");

  // Cast the hours value to a number for each piece of tvData
  volume_data.forEach(function(data) {
    data.WEDate = parseTime(data.WEDate)
    data.sWEDate = sortDate(data.WEDate)		
    data.WEDate = newDateFormat(data.WEDate)    
    data.California = +data.California;
    data.Chile = +data.Chile;
    data.Mexico = +data.Mexico;
  });

  var vol_2020 = volume_data.filter(d => d.Year == '2020');
  var vol_2021 = volume_data.filter(d => d.Year == '2021');
  var vol_2022 = volume_data.filter(d => d.Year == '2022');
    

  chosenYear = vol_2020;

  var barSpacing = 10; // desired space between each bar
  var scaleY = 100000; // 10x scale on rect height
// scale y to chart height
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(chosenYear, data => data.Mexico / scaleY) + 50])
    .range([chartHeight, 0]);

  // scale x to chart width
  var xScale = d3.scaleBand()
    .domain(chosenYear.map(data => data.WEDate))
    .range([0, chartWidth])
    .padding(0.05);

	// create axes
	var yAxis = d3.axisLeft(yScale);
	var xAxis = d3.axisBottom(xScale);

	// set x to the bottom of the chart
	chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis)
    .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")  
      .attr("transform", "rotate(45)")
      .attr("text-anchor", "start");

	// set y to the y axis
	// This syntax allows us to call the axis function
	// and pass in the selector without breaking the chaining
	chartGroup.append("g")
	.call(yAxis);

	/* Note: The above code is equivalent to this:
		var g = chartGroup.append("g");

		yAxis(g);
	*/
	// Append Data to chartGroup
	chartGroup.selectAll(".bar")
	.data(chosenYear)
	.enter()
	.append("rect")
	.classed("bar", true)
	.attr("x", d => xScale(d.WEDate))
	.attr("y", d => yScale((d.Mexico/scaleY)))
	.attr("width", xScale.bandwidth())
	.attr("height", d => chartHeight - yScale((d.Mexico/scaleY)));


//   var barSpacing = 10; // desired space between each bar
//   var scaleY = 100000; // 10x scale on rect height

//   // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
//   var barWidth = (chartWidth - (barSpacing * (chosenYear.length - 1))) / chosenYear.length;

//   // @TODO
//   // Create code to build the bar chart using the tvData.
//   chartGroup.selectAll(".bar")
//     .data(chosenYear)
//     .enter()
//     .append("rect")
//     .classed("bar", true)
//     .attr("width", d => barWidth)
//     .attr("height", d => d.Mexico / scaleY)
//     .attr("x", (d, i) => i * (barWidth + barSpacing))
//     .attr("y", d => chartHeight - d.Mexico / scaleY);
}).catch(function(error) {
  console.log(error);
});
