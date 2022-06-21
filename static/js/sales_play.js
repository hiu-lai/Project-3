var usmap = L.map("map-container", {
	center: [-28.01, 153.4],
	zoom: 13
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1IjoiaGl1LWxhaSIsImEiOiJjbDN0eTBmMjgwMDM2M2tuenRlbzBrcmZmIn0.w7iSVYkiafu3iYTcwicpMA"
}).addTo(usmap);



// d3.json("/avocado/sales").then(function(sales_data) {
// 	var parseTime = d3.timeParse("%d-%m-%Y");
// 	var newDateFormat = d3.timeFormat("%d-%b");
// 	var sortDate = d3.timeFormat("%Y-%m-%d");
// 	var monthFormat = d3.timeFormat("%m");

// 	// Cast the hours value to a number for each piece of tvData
// 	sales_data.forEach(function(data) {
// 	  data.WEDate = parseTime(data['Weekly Reporting Date'])
// 	  data.sWEDate = sortDate(data.WEDate)		
// 	  data.WEDate = newDateFormat(data.WEDate)    
// 	  data.asp = +data['Average Avocado Price Year'];
// 	  data.small = +data['Small/Medium (4046) Units'];
// 	  data.large = +data['Large (4225) Units'];
// 	  data.xl = +data['Extra Large (4770) Units'];
// 	  data.bulkGTIN = +data['Bulk GTIN'];
// 	  data.BaggedUnits = +data['Bagged Units']
// 	  data.TotalUnits = +data['Total Units']
// 	});



	  



// });

