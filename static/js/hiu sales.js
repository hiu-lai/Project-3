
d3.json("/avocado/sales").then(function(sales_data) {
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

	// console.log(data.months)
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
		var monthgroup = d3.group(chosenYear, d => d.Month)
		var monthlyTot = d3.sum(monthgroup)
		console.log(monthgroup)
		// console.log(chosenYear)

		var monthlyData = monthgroup.map(function(abc) {
			return {
				name: abc.month,
				tot: ((+d.TotalUnits))
			}
		})
		console.log(monthlyData)
		
		console.log(monthlyData)
	  }
	  



});

