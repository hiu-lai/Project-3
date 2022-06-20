const DROPDOWN = d3.select("#SalesDate");
const COMPGRAPH = d3.select("#SalesGraph");
var salesData;

function getCurrentDateInfo(){
    let currDate = DROPDOWN.property("value");

    currentObject = salesData.filter(salesEntry => salesEntry.Week == currDate)[0];

    return currentObject;
}

function makeGraph(currentObject){
    var compData = [{
        // x: ['Mexico', 'California', 'Peru', 'Chile', 'Colombia'],
        x: ['Small/Medium (4046) Units', 'Large (4225) Units', 'Extra Large (4770) Units', 'Bulk GTIN', 'Bagged Units'],
        y: [currentObject['Small/Medium (4046) Units'], currentObject['Large (4225) Units'], currentObject['Extra Large (4770) Units'], currentObject['Bulk GTIN'], currentObject['Bagged Units']],
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
            range: [0, 15000000]
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
    salesData = incomingData;
    
    var allDates = salesData.map(salesEntry => salesEntry.Week);

    allDates.forEach(d => {
        DROPDOWN.append("option").property("value", d).text(d);
    })

    var currentObject = getCurrentDateInfo();
    console.log(currentObject);
    makeGraph(currentObject);
})

DROPDOWN.on("change", handlesalesDateChange);