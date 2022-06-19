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
    .attr("width", svgWidth)
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


  // svg.append("text")
  //   .text("20")
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

    function update(chosenYear) {

      
      var subgroups = ['Total Volume','California', 'Chile', 'Colombia', 'Dominican Republic', 'Mexico', 'Peru']
      var groups = d3.map(chosenYear, d => d.WEDate)

      
      var scaleY = 100000;

      // Add X axis
      var x = d3.scaleBand()
        .domain(groups)
        .range([0, chartWidth])
        .padding([0.2])
      svg.append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(x).tickSize(0));
        // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, d3.max(chosenYear, data => data.Mexico / scaleY) + 50])
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