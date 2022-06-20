queue()
    .defer(d3.json, "http://192.168.1.172:8000/avocado/sales")
    .await(csvToSeries);

// fetch('http://10.0.0.40:8000/avocado/sales')
// .then(function (response) {
// return response.text();
//  })
// //  .then(function(response)
// // {console.log(response.text())})
// .then(function (text) {
// // let series = csvToSeries(text);
// // renderChart(series);
// csvToSeries(text);
// })
// .catch(function (error) {
//  //Something went wrong
//  console.log(error);
// });

function csvToSeries(error, text) {

//     console.log(text)
//     text.forEach(function (row) {
// // d3.json("http://192.168.1.172:8000/avocado/sales").then(function(row, err) {
//     // if (err) throw err;

//     var parseTime = d3.timeParse("%d-%m-%Y");
//     var newDateFormat = d3.timeFormat("%d-%B-%Y");
//     var sortDate = d3.timeFormat("%Y-%m-%d");

//     sales_data.forEach(function(d){
//         d['Weekly Reporting Date'] = parseTime(d['Weekly Reporting Date'])
//         d['sWeekly Reporting Date'] = sortDate(d['Weekly Reporting Date'])
//         d['Weekly Reporting Date'] = newDateFormatd(['Weekly Reporting Date'])

//         // d['WEDate'] = parseTime(d['WEDate'])
//         // d['sWEDate'] = sortDate(d['WEDate'])		
//         // d['WEDate'] = newDateFormat(d['WEDate'])

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


//         // d["California"] = +d["California"];
//         // d["Chile"] = +d["Chile"];
//         // d["Colombia"] = +d["Colombua"];
//         // d["Dominican Republic"] = +d["Dominican Republic"];
//         // d["Mexico"] = +d["Mexico"];
//         // d["Peru"] = +d["Peru"];
//         // d["Total Volume"] = +d["Total Volume"];
//         // d['Year'] = +d['Year'];

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

// })}

// .catch(function(error) {
//      console.log(error)});






























//  --------------------------------------------------------------------
    const SME = 'Small/Medium (4046) Units';
    const ELarge = 'Extra Large (4770) Units';
    const date = 'Weekly Reporting Date';
    console.log(text)

    // let dataAsJson = JSC.csv2Json(text);
    // let dataAsJson = JSON.parse(text);
    let smallmedium = [], ExtraLarge = [];
    
    // var parseTime = d3.timeParse("%d-%m-%Y");
    // var formatTime = d3.timeformat("%B %d %Y");
    var time = moment(date).format('DD-MM-YYYY');


    text.forEach(function (row) {
        // row["date"] = parseTime.parse(row["date"])
        // row[date] = formatTime(row["date"])

        if (row.City_x === 'Total U.S.') { 

            smallmedium.push({x: (row[time]), y: row[SME]}), 
            ExtraLarge.push({x: row[date], y: row[ELarge]})     
    }});
        console.log([smallmedium, ExtraLarge]);
    }

// -------------------------------------------------------------------------


// // return [
//     //     {name:  '4046', points: smallmedium},
//     //     {name: '4770', points: ExtraLarge}
//     //         ];







// // fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
// //    .then(function (response) {
// //       return response.text();
// //    })
// //    .then(function (text) {
// // 	let series = csvToSeries(text);
// // 	renderChart(series);
// //     // csvToSeries(text);
// //    })
// //    .catch(function (error) {
// //       //Something went wrong
// //       console.log(error);
// //    });

// //  function csvToSeries(text) {
// // 	const lifeExp = 'average_life_expectancy';
// // 	let dataAsJson = JSC.csv2Json(text);
// // 	let male = [], female = [];
// // 	dataAsJson.forEach(function (row) {
// // 		 //add either to male, female, or discard.
// // 		if (row.race === 'All Races') {
// // 			if (row.sex === 'Male') {
// // 				male.push({x: row.year, y: row[lifeExp]});
// // 			} else if (row.sex === 'Female') {
// // 				female.push({x: row.year, y: row[lifeExp]});
// // 			}
// // 		}
// // 	});
// //     return [
// //             {name: 'Male', points: male},
// //             {name: 'Female', points: female}
// //          ];
// // }

// // function renderChart(series){
// // 	JSC.Chart('chartDiv', {
// // 		title_label_text: 'Life Expectancy in the United States',
// // 		annotations: [{
// // 			label_text: 'Source: National Center for Health Statistics',
// // 			position: 'bottom left'
// // 		}],
// //         legend_visible: false,
// // 		defaultSeries_lastPoint_label_text: '<b>%seriesName</b>',
// // 		defaultPoint_tooltip: '%seriesName <b>%yValue</b> years',
// // 		xAxis_crosshair_enabled: true,
// // 		series: series
// // 	});
// // }










// function makeTrace(i) {
//     return {
//         y: Array.apply(null, Array(10)).map(() => Math.random()),
//         line: {
//             shape: 'spline' ,
//             color: 'red'
//         },
//         visible: i === 0,
//         name: 'Data set ' + i,
//     };
// }

// Plotly.newPlot('myDiv', [0, 1, 2, 3].map(makeTrace), {
//     updatemenus: [{
//         y: 0.8,
//         yanchor: 'top',
//         buttons: [{
//             method: 'restyle',
//             args: ['line.color', 'red'],
//             label: 'red'
//         }, {
//             method: 'restyle',
//             args: ['line.color', 'blue'],
//             label: 'blue'
//         }, { 
//             method: 'restyle',
//             args: ['line.color', 'green'],
//             label: 'green'
//         }]
//     }, {
//         y: 1,
//         yanchor: 'top',
//         buttons: [{
//             method: 'restyle',
//             args: ['visible', [true, false, false, false]],
//             label: 'Data set 0'
//         }, {
//             method: 'restyle',
//             args: ['visible', [false, true, false, false]],
//             label: 'Data set 1'
//         }, {
//             method: 'restyle',
//             args: ['visible', [false, false, true, false]],
//             label: 'Data set 2'
//         }, {
//             method: 'restyle',
//             args: ['visible', [false, false, false, true]],
//             label: 'Data set 3'
//         }]
//     }],
// });