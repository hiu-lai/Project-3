function makeResponsive() {

	var svgArea = d3.select(".sales_3_years").select("svg");
	if (!svgArea.empty()) {
	  svgArea.remove();
	}
  
  // Define SVG area dimensions
	var svgWidth = 1300;
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
	  .select(".sales_3_years")
	  .append("svg")
	  .attr("height", svgHeight)
	  .attr("width", svgWidth)
	  .attr("style", "background-color:white")
	  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
  
  
	// svg.append("text")
	//   .text("20")
	d3.json("/avocado/sales").then(function(sales_data) {
  
	  function init() { 
		getData();
	  }
	  var parseTime = d3.timeParse("%d-%m-%Y");
	  var newDateFormat = d3.timeFormat("%d-%b");
	  var sortDate = d3.timeFormat("%Y-%m-%d");
	  var monthFormat = d3.timeFormat("%m");
	  // Cast the hours value to a number for each piece of tvData
	  sales_data.forEach(function(data) {
		data.WEDate = parseTime(data['Weekly Reporting Date'])
		data.sWEDate = sortDate(data.WEDate)
		data.WEDate = newDateFormat(data.WEDate)
		data.asp = +data['Average Avocado Price Year'];
		data.small = +data['Small/Medium (4046) Units'];
		data.large = +data['Large (4225) Units'];
		data.xl = +data['Extra Large (4770) Units'];
		data.bulkGTIN = +data['Bulk GTIN'];
		data.BaggedUnits = +data['Bagged Units']
		data.TotalUnits = +data['Total Units']
	  });
	  // setup buttons
  
	  d3.select("#first_year").on("click", getData);
	  d3.select("#second_year").on("click", getData);
	  d3.select("#third_year").on("click", getData);
	  
	  function getData() {
  
		if (this.id == "first_year"){
		  var selYear = '2020';
		}
		else if (this.id == "second_year") {
		  var selYear = '2021';
		}
		else {
		  var selYear = '2022';
		}
  
		var chosenYear = sales_data.filter(d => d.Year == selYear);
  
		update(chosenYear)
		
	  }
  
	  function update(chosenYear) {
		d3.selectAll("g").remove();
		
		var subgroups = ['Small/Medium (4046) Units', 'Large (4225) Units', 'Extra Large (4770) Units', 'Bulk GTIN', 'Bagged Units']
		// ['Total Volume','California', 'Chile', 'Colombia', 'Dominican Republic', 'Mexico', 'Peru']
		var groups = d3.map(chosenYear, d => d.WEDate)
  
		
		var scaleY = 100000;
  
		// Add X axis
		var x = d3.scaleBand()
		  .domain(groups)
		  .range([0, chartWidth])
		  .padding([0.2])

		  svg.append("g")
          .attr("transform", "translate(0," + chartHeight + ")")
          .call(d3.axisBottom(x).tickSize(0))
          .selectAll("text")
            .attr("transform", "translate(-10,10)rotate(-90)")
            .style("text-anchor", "end")
            .on("click", function(d){
              console.log(d)
            });


		// svg.append("g")
		//   .attr("transform", "translate(0," + chartHeight + ")")
		//   .call(d3.axisBottom(x).tickSize(0));

		  // Add Y axis
		var y = d3.scaleLinear()
		  .domain([0, d3.max(chosenYear, data => data.small/ scaleY) + 50])
		  .range([ chartHeight, 0 ]);
		svg.append("g")
		  .call(d3.axisLeft(y));
  
		var xSubgroup = d3.scaleBand()
		  .domain(subgroups)
		  .range([0, x.bandwidth()])
		  .padding([0.05])
  
		var colour = d3.scaleOrdinal()
		  .domain(subgroups)
		  .range(d3.schemeSet2)
		
		svg.append("g")
		  .selectAll("g")
		  .data(chosenYear)
		  .enter()
		  .append("g")
			.attr(`transform`, function(d){ return "translate(" + x(d.WEDate) + ",0)"; })
		  .selectAll("rect")
		  .data(function(d) { return subgroups.map(function(key) {return {key: key, value: (d[key]/scaleY)}; }); })
		  .enter().append("rect")
			.attr("x", function(d) { return xSubgroup(d.key); })
			.attr("y", function(d) { return y(d.value); })
			.attr("width", xSubgroup.bandwidth())
			.attr("height", function(d) { return chartHeight - y(d.value); })
			.attr("fill", function(d) { return colour(d.key); })
		// legends
		svg.selectAll("mydots")
		  .data(subgroups)
		  .enter()
		  .append("circle")
			.attr("cx", 990)
			.attr("cy", function(d,i){ return 10 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
			.attr("r", 5)
			.style("fill", function(d){ return colour(d)})
	  
		  // Add one dot in the legend for each name.
		  svg.selectAll("mylabels")
			.data(subgroups)
			.enter()
			.append("text")
			  .attr("x", 1010)
			  .attr("y", function(d,i){ return 10 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
			  .style("fill", function(d){ return colour(d)})
			  .text(function(d){ return d})
			  .attr("text-anchor", "left")
			  .style("alignment-baseline", "middle")
	  }
	  
	  init();
	
	}).catch(function(error) {
	  console.log(error);
	});
  }
  makeResponsive();
  
  d3.select(window).on("resize", makeResponsive);