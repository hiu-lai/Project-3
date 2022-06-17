JSC.Chart('chart1', {
    type: 'horizontal column',
   series: [
      {
         points: [
            {x: 'Apples', y: 50},
            {x: 'Oranges', y: 42}
         ]
      }
   ]
});

JSC.Chart('chart2', { 
    type: 'vertical column',
    series: [
        {
            name: 'Rammy',
            points: [
                {x: 'Apples', y:50},
                {x: 'Oranges', y: 70}
            ]
        },
        {
            name: 'Nikki',
            points: [
                {x: 'Apples', y:30},
                {x: 'Oranges', y: 60},
                {x: 'Bananas', y: 12}
            ]
        }
    ]
} )

fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
   .then(function (response) {
      return response.text();
   })
   .then(function (text) {
	let series = csvToSeries(text);
	renderChart(series);
    // csvToSeries(text);
   })
   .catch(function (error) {
      //Something went wrong
      console.log(error);
   });

// function csvToSeries(text) {
//     let dataAsJson = JSC.csv2Json(text);
//     console.log(dataAsJson)
//  }

//  function csvToSeries(text) {
//     const lifeExp = 'average_life_expectancy';
//     let dataAsJson = JSC.csv2Json(text);
//     let male = [], female = [];
    
//     dataAsJson.forEach(function (row) {
//         if (row.race === 'All Races') {
//             if (row.sex == 'Male') {
//                 male.push({x: row.year, y: row[lifeExp]});
//             }
//             else if (row.sex === 'Female') {
//             female.push({x: row.year, y: row[lifeExp]});
//             }
//         }        
//     });
//     console.log([male, female]);  
//  }
 
 function csvToSeries(text) {
	const lifeExp = 'average_life_expectancy';
	let dataAsJson = JSC.csv2Json(text);
	let male = [], female = [];
	dataAsJson.forEach(function (row) {
		 //add either to male, female, or discard.
		if (row.race === 'All Races') {
			if (row.sex === 'Male') {
				male.push({x: row.year, y: row[lifeExp]});
			} else if (row.sex === 'Female') {
				female.push({x: row.year, y: row[lifeExp]});
			}
		}
	});
    return [
            {name: 'Male', points: male},
            {name: 'Female', points: female}
         ];
}


//  return [
//     {name: 'Male', points: male},
//     {name: 'Female', points: female}
//  ];


// function renderChart(series){
//     JSC.Chart('chart3', {
//        series: series
//     });
//  }


//  .then(function (text) {
// 	let series = csvToSeries(text);
// 	renderChart(series);
// })

// function renderChart(series){
//     JSC.Chart('chart3', {
//         title_label_text: 'Life Expectancy in the United States',
//         annotations: [{
//             label_text: 'Source: National Center for Health Statistics',
//             position: 'bottom left'
//         }],
//             legend_visible: false,
//         defaultSeries_lastPoint_label_text: '<b>%seriesName</b>',
//         defaultPoint_tooltip: '%seriesName <b>%yValue</b> years';
//         xAxis_crosshair_enabled: true,
//         series: series
//     });
// }

function renderChart(series){
	JSC.Chart('chartDiv', {
		title_label_text: 'Life Expectancy in the United States',
		annotations: [{
			label_text: 'Source: National Center for Health Statistics',
			position: 'bottom left'
		}],
        legend_visible: false,
		defaultSeries_lastPoint_label_text: '<b>%seriesName</b>',
		defaultPoint_tooltip: '%seriesName <b>%yValue</b> years',
		xAxis_crosshair_enabled: true,
		series: series
	});
}



// JS Drop down trial code  
// $(document).ready(function() {
//     $('#generate').click(function() {
//         var values = ["dog", "cat", "parrot", "rabbit"];
 
//         $('#container')
//         .append(
//             $(document.createElement('label')).prop({
//                 for: 'pets'
//             }).html('Choose your pets: ')
//         )
//         .append(
//             $(document.createElement('select')).prop({
//                 id: 'pets',
//                 name: 'pets'
//             })
//         )
 
//         for (const val of values) {
//             $('#pets').append($(document.createElement('option')).prop({
//                 value: val,
//                 text: val.charAt(0).toUpperCase() + val.slice(1)
//             }))
//         }
//     })
// });

function makeTrace(i) {
    return {
        y: Array.apply(null, Array(10)).map(() => Math.random()),
        line: {
            shape: 'spline' ,
            color: 'red'
        },
        visible: i === 0,
        name: 'Data set ' + i,
    };
}

Plotly.newPlot('myDiv', [0, 1, 2, 3].map(makeTrace), {
    updatemenus: [{
        y: 0.8,
        yanchor: 'top',
        buttons: [{
            method: 'restyle',
            args: ['line.color', 'red'],
            label: 'red'
        }, {
            method: 'restyle',
            args: ['line.color', 'blue'],
            label: 'blue'
        }, { 
            method: 'restyle',
            args: ['line.color', 'green'],
            label: 'green'
        }]
    }, {
        y: 1,
        yanchor: 'top',
        buttons: [{
            method: 'restyle',
            args: ['visible', [true, false, false, false]],
            label: 'Data set 0'
        }, {
            method: 'restyle',
            args: ['visible', [false, true, false, false]],
            label: 'Data set 1'
        }, {
            method: 'restyle',
            args: ['visible', [false, false, true, false]],
            label: 'Data set 2'
        }, {
            method: 'restyle',
            args: ['visible', [false, false, false, true]],
            label: 'Data set 3'
        }]
    }],
});