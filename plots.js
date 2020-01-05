function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  })
  
  //Initialize Charts//
  //Initialize Bar
  barData = [{
    type: "bar",
    orientation: "h",
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    text: ["Hello1", "Hello2","Hello3","Hello4","Hello5","Hello6","Hello7","Hello8","Hello9","Hello10",]
  }];
  Plotly.newPlot("bar", barData);

  //Initialize Gauge

  //Initialize Bubble
}

init();

function optionChanged(newSample) {
  buildMetaData(newSample);
  buildBarChart(newSample);
  //buildGauge(newSample);
  //buildBubbleChart(newSample);
}

function buildMetaData(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    console.log(Object.entries(result))
    var demographicInfo = Object.entries(result);
    demographicInfo.forEach(item => PANEL.append("h6").text(item[0].toUpperCase() + ": " + item[1]));
  });
}

function buildBarChart (sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(selObj => selObj.id == sample)
    var result = resultArray[0];
    console.log(result);

    var values = result.sample_values.slice(0,10);
    var labels = result.otu_labels.slice(0,10);
    var idNum = result.otu_ids.slice(0,10);
    //var topSevenCitiesPop = topSevenCities.map(city => parseInt(city.population));
    var idString = idNum.map(id => "OTU_" + id.toString());
    console.log(values);
    console.log(labels);
    console.log(idNum);
    console.log(idString);

    var trace = [{
      type: "bar",
      orientation: "h",
      x: values,
      y: idString,
      text: labels
    }];

    var layout = {
      yaxis: {
        autorange: "reversed"
      }
    };

    Plotly.newPlot("bar", trace, layout);
    
    /*
    d3.selectAll("#dropdownMenu").on("change", updatePlotly);
    function updatePlotly() {
      var dropdownMenu = d3.select("#dropdownMenu");
      var dataset = dropdownMenu.property("value");
    
      var xData = [1, 2, 3, 4, 5];
      var yData = [];
    
      if (dataset === 'dataset1') {
        yData = [1, 2, 4, 8, 16];
      };
    
      if (dataset === 'dataset2') {
        yData = [1, 10, 100, 1000, 10000];
      };
    
      var trace = {
        x: [xData],
        y: [yData],
      };
      Plotly.restyle("plot", trace);
    };
    */



    //var sortedOTU = result.sample_values.sort((a,b) => a.sample_values - b.sample_values);
    //console.log(sortedOTU);

    //var sortedCities = cityGrowths.sort((a,b) => 
    //a.Increase_from_2016 - b.Increase_from_2016).reverse();

    //x: otu_ids
    //y: Sample Values
    //Hover Text = otu_labels

    //var topFiveCities = sortedCities.slice(0,5);
    //var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    //var result = resultArray[0];
    //var PANEL = d3.select("#bar");

    //PANEL.html("");
    //console.log(Object.entries(result))
    //var demographicInfo = Object.entries(result);
    //demographicInfo.forEach(item => PANEL.append("h6").text(item[0].toUpperCase() + ": " + item[1]));
  });
}

/*
function buildGauge() {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#gauge");

    PANEL.html("");
    console.log(Object.entries(result))
    var demographicInfo = Object.entries(result);
    demographicInfo.forEach(item => PANEL.append("h6").text(item[0].toUpperCase() + ": " + item[1]));
  });
}

function buildBubbleChart() {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#bubble");

    PANEL.html("");
    console.log(Object.entries(result))
    var demographicInfo = Object.entries(result);
    demographicInfo.forEach(item => PANEL.append("h6").text(item[0].toUpperCase() + ": " + item[1]));
  });
}
*/
