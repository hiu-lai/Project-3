function makeResponsive() {

	var svgArea = d3.select(".volume_3_years").select("svg");
	if (!svgArea.empty()) {
	  svgArea.remove();
	}
  
  // Define SVG area dimensions
	var svgWidth = 1160;
	var svgHeight = 500;
  
	// Define the chart's margins as an object
	var chartMargin = {
	  top: 30,
	  right: 30,
	  bottom: 50,
	  left: 50
	};
  
	// Define dimensions of the chart area
	var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
	var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
  
	// Select body, append SVG area to it, and set the dimensions
	var svg = d3
	  .select(".volume_3_years")
	  .append("svg")
	  .attr("height", svgHeight)
	  .attr("width", svgWidth)
	  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  
	d3.json("/avocado/volume").then(function(volume_data) {
  
	  function init() { 
		getData();
	  }
  
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
		data.totalVolume = +data['Total Volume']
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
  
		var chosenYear = volume_data.filter(d => d.Year == selYear);
  
		update(chosenYear)
	  }


	  function update(chosenYear, selectedItem) {
		d3.selectAll("g").remove();
		console.log(selectedItem)
		
		var subgroups = ['Total Volume','California', 'Chile', 'Colombia', 'Dominican Republic', 'Mexico', 'Peru']

		var groups = d3.map(chosenYear, d => d.WEDate)
		
		var scaleY = 100000;
		
		var dataReady = subgroups.map(function(colname) {

			return {
			name: colname,
			values: chosenYear.map(function(d) {

			  return {date: d['WEDate'], value: +d[colname]};
			})
		  }
		})

		
		// var y_scale = d3.scaleLinear().range([chartHeight,0]);
		
		var colour = d3.scaleOrdinal()
		.domain(dataReady)
		.range(d3.schemeSet2)


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
		
		//Add Y axis

		var y = d3.scaleLinear()
			.domain([0, d3.max(chosenYear, data => data.Mexico / scaleY) + 50])
			.range([ chartHeight, 0 ]);
		svg.append("g")
			.call(d3.axisLeft(y));
  
  
		  // Add Y axis
		// console.log(d3.max(chosenYear, data => data.Mexico / scaleY))
		// var y = d3.scaleLinear()
		//   .domain([0, (d3.max(chosenYear, data => data.Mexico / scaleY) + 70)])
		//   .range([ chartHeight, 0 ]);
		
		  

		svg.append("g")
		  .call(d3.axisLeft(y))
		  .selectAll("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 0 - chartMargin.left)
		  .attr("x", 0 - chartHeight/2)
		  .attr("dy", "1em")
		  .style("text-achor", "middle")
		  .text("Volume (kg)")
  
		var xSubgroup = d3.scaleBand()
		  .domain(subgroups)
		  .range([0, x.bandwidth()])
		  .padding([0.05])
  
	   
		svg.append("g")
		  .selectAll("g")
		  .data(chosenYear)
		  .enter()
		  .append("g")
			.attr(`transform`, function(d){ 
			  return "translate(" + x(d.WEDate) + ",0)"; 
			})
		  .selectAll("rect")
		  .data(function(d) { 
			return subgroups.map(function(key) {
			  return {key: key, value: (d[key]/scaleY)}; 
			}); 
		  })
		  .enter().append("rect")
			.attr("x", function(d) { return xSubgroup(d.key); })
			.attr("y", function(d) { return y(d.value); })
			.attr("width", xSubgroup.bandwidth())
			.attr("height", function(d) { return chartHeight - y(d.value); })
			.attr("fill", function(d) {return colour(d.key); })
		   
		svg.selectAll("myLegend")
			.data(dataReady)
			.enter()
			  .append('g')
			  .append("text")
				.attr('x', function(d,i){ 
				  if (d.name == 'Dominican Republic' || d.name == 'Colombia'){
					var textsize = 560;
				  }
				  else {
					// console.log(d.name)
					var textsize = 600;
				  }
				  return textsize + i*80
				})
				.attr('y', 10)
				.text(function(d) { return d.name; })
				.style("fill", function(d){ return colour(d.name) })
				.style("font-size", 12)
				.on("click", function (d, i){
					selectedItem = i.name
					update(chosenYear,selectedItem)
				})
	  }
	  
	  init();
	
	}).catch(function(error) {
	  console.log(error);
	});
  }
  makeResponsive();
  
  d3.select(window).on("resize", makeResponsive);
  