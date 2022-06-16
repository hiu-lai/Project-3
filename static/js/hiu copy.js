  d3.json("/avocado/volume").then(function(volume_data, err) {
    if (err) throw err;

	// var dateFormat = d3.time.format("%Y-%m-%d");
    volume_data.forEach(function(d){
		// d["WEDate"] = dateFormat.parse(d["WEDate"]);
		d["WEDate"].setDate(1);
		d["California"] = +d["California"];
		d["Chile"] = +d["Chile"];
		d["Colombia"] = +d["Colombua"];
		d["Dominican Republic"] = +d["Dominican Republic"];
		d["Mexico"] = +d["Mexico"];
		d["Peru"] = +d["Peru"];
		d["Total Volume"] = +d["Total Volume"];
		d['Year'] = +d['Year'];
		
	// });
	})
		var vol_2020 = volume_data.filter(d => d['Year'] == '2020')
		console.log(vol_2020)

})