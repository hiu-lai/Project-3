const DROPDOWN = d3.select("#SalesDate");
const COMPGRAPH = d3.select("#SalesGraph");
var salesdata;


// // -- Year 
// -- Product Type
// -- Region
// -- City 
// -- 





// 'City', 'Timeframe', 'Weekly Reporting Date', 'Produce Type', 'Average Avocado Price Year', 
// 'Small/Medium (4046) Units', 'Large (4225) Units', 'Extra Large (4770) Units', 'Bulk GTIN', 'Bagged Units', 'Total Units', 'Year', 'Month'












function getCurrentDateInfo(){
    let currDate = DROPDOWN.property("value");

    currentObject = salesdata.filter(salesEntry => salesEntry.Year == currDate)[0];

    return currentObject;
    // console.log(currentObject)
}

function makeGraph(currentObject){
    var compData = [{
        // x: ['Mexico', 'California', 'Peru', 'Chile', 'Colombia'],
        x: ['Small/Medium (4046) Units', 'Large (4225) Units', 'Extra Large (4770) Units', 'Bulk GTIN', 'Bagged Units'],
        // x: ['Small/Medium (4046) Units'],
        y: [currentObject['Small/Medium (4046) Units'], currentObject['Large (4225) Units'], currentObject['Extra Large (4770) Units'], currentObject['Bulk GTIN'], currentObject['Bagged Units']],
        // y: [currentObject['Small/Medium (4046) Units']],
        type: 'bar',
        marker: {
            color: '#198754'
        }
    }]

    var compLayout = {
        title: `Output for Year of ${currentObject.Year}`,
        xaxis: {
            title: "Country"
        },
        yaxis: {
            title: "Amount Avocados",
            range: [0, 150000]
        }
    }

    Plotly.newPlot("SalesGraph", compData, compLayout, {responsive:true});
}

function handlesalesDateChange(){
    var currentObject = getCurrentDateInfo();

    makeGraph(currentObject);
    console.log(currentObject);
}

d3.json("/avocado/sales").then(incomingData => {
    salesdata = incomingData;
    
    var allDates = salesdata.map(salesEntry => salesEntry.Year);

    allDates.forEach(d => {
        DROPDOWN.append("option").property("value", d).text(d);
    })

    var currentObject = getCurrentDateInfo();
    console.log(currentObject);
    makeGraph(currentObject);
})

DROPDOWN.on("change", handlesalesDateChange);