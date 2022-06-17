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