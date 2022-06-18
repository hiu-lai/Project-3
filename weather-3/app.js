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
//   .select("volume_3_years")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // var yAxis = svg.append("g")
// // 	.attr("transform", `translate(${margin.left}, ${margin.top})`);

// var x = d3.scaleBand()
// 	.range([0, width])
// 	.padding(0.2);

// var xAxis = svg.append("g")
// 	.attr(`transform`, `translate(0, " + height + ")`)

// var y = d3.scaleLinear()
//   .range([ height, 0]);

// var yAxis = svg.append("g")
//   .attr("class", "volume_3_years")

// d3.json("/avocado/volume").then(function(volume_data, err) {
//     if (err) throw err;

// 	var dateFormat = d3.timeFormat("%Y-%m-%d");

//     volume_data.forEach(function(d){
// 		d["WEDate"] = dateFormat(d["WEDate"]);
// 		d["WEDate"].setDate(1);
// 		d["California"] = +d["California"];
// 		d["Chile"] = +d["Chile"];
// 		d["Colombia"] = +d["Colombua"];
// 		d["Dominican Republic"] = +d["Dominican Republic"];
// 		d["Mexico"] = +d["Mexico"];
// 		d["Peru"] = +d["Peru"];
// 		d["Total Volume"] = +d["Total Volume"];
// 		d['Year'] = +d['Year'];
// 		console.log(d['WEDate'])
// 	// });
// 	})
		
// 		var vol_2020 = volume_data.filter(d => d['Year'] == '2020');
// 		var vol_2021 = volume_data.filter(d => d['Year'] == '2021');
// 		var vol_2022 = volume_data.filter(d => d['Year'] == '2022');
		
// 		chosenYear = volume_data;

// 		console.log(chosenYear)
	
// 		x.domain(chosenYear.map(function(d) {return d['WEDate']; }))
// 		xAxis.call(d3.axisBottom(x))

// 		y.domain([0, d3.max(data, function(d) { return d.value }) ]);
//   		yAxis.transition().duration(1000).call(d3.axisLeft(y));

// 		// Create the u variable
// 		var u = svg.selectAll("rect")
// 			.data(data)

// 		u
// 			.enter()
// 			.append("rect") // Add a new rect for each new elements
// 			.merge(u) // get the already existing elements as well
// 			.transition() // and apply changes to all of them
// 			.duration(1000)
// 			.attr("x", function(d) { return x(d['WEDate']); })
// 			.attr("y", function(d) { return y(d['WEDate']); })
// 			.attr("width", x.bandwidth())
// 			.attr("height", function(d) { return height - y(d.value); })
// 			.attr("fill", "#69b3a2")

// 		// If less group in the new dataset, I delete the ones not in use anymore
// 		u
// 			.exit()
// 			.remove()
// 	}
// ).catch(function(error) {
// 	console.log(error);
// });

const DROPDOWN = d3.select("#competitionDate");
const COMPGRAPH = d3.select("#competitionGraph");
var volumeData;


function getCurrentDateInfo(){
    let currDate = DROPDOWN.property("value");

    currentObject = volumeData.filter(volumeEntry => volumeEntry.Week == currDate)[0];

    return currentObject;
}

function makeGraph(currentObject){
    var compData = [{
        x: ['Mexico', 'California', 'Peru', 'Chile', 'Colombia'],
        y: [currentObject.Mexico, currentObject.California, currentObject.Peru, currentObject.Chile, currentObject.Colombia],
        type: 'bar',
        marker: {
            color: '#198754'
        }
    }]

    var compLayout = {
        title: `Output for Week of ${currentObject.Week}`,
        xaxis: {
            title: "Country"
        },
        yaxis: {
            title: "Amount Avocados",
            range: [0, 150000]
        }
    }

    Plotly.newPlot("competitionGraph", compData, compLayout, {responsive:true});
}

function handleVolumeDateChange(){
    var currentObject = getCurrentDateInfo();

    makeGraph(currentObject);
    console.log(currentObject);
}

d3.json("/avocado/volume").then(incomingData => {
    volumeData = incomingData;
    
    var allDates = volumeData.map(volumeEntry => volumeEntry.Week);

    allDates.forEach(d => {
        DROPDOWN.append("option").property("value", d).text(d);
    })

    var currentObject = getCurrentDateInfo();
    console.log(currentObject);
    makeGraph(currentObject);
})

DROPDOWN.on("change", handleVolumeDateChange);