function init() {
  var selector = d3.select("#selDataset");

  //Populate Test Subject ID Number
  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    
    // INITIALIZE INFORMATION:
    // Metadata
    // Bar Chart
    // Gauge
    // Bubble Chart

    buildMetaData(data.names[0]);
    buildBarChart(data.names[0]);
    buildGauge(data.names[0]);
    buildBubbleChart(data.names[0]);
  })
}

init();

function optionChanged(newSample) {
  //Update panels on new selection
  buildMetaData(newSample);
  buildBarChart(newSample);
  buildGauge(newSample);
  buildBubbleChart(newSample);
}

// Build Meta Data Panel
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

// Build Bar Chart Panel
function buildBarChart (sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(selObj => selObj.id == sample)
    var result = resultArray[0];
    console.log(result);

    var values = result.sample_values.slice(0,10);
    var labels = result.otu_labels.slice(0,10);
    var idNum = result.otu_ids.slice(0,10);
    var idString = idNum.map(id => "OTU_" + id);

    var trace = [{
      type: "bar",
      orientation: "h",
      x: values,
      y: idString,
      text: labels
    }];

    var layout = {
      title: { text: "Top 10 Bacterium Found" },
      yaxis: { autorange: "reversed" }
    };

    Plotly.newPlot("bar", trace, layout);
  });
}

// Build Gauge Panel
function buildGauge(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var wFreq = result.wfreq;
    
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        title: { 
          text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week"  
        },
        value: wFreq,
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { 
            range: [0, 9],
            tickmode: "linear" 
          },
          bar: {
            color: "dodgerblue",
            thickness: ".33",
            line: {
              width: 3,
              color: "black" 
            },
          },
          steps: [
            { range: [0, 1], color: "#2e3d10" },
            { range: [1, 2], color: "#4c651a" },
            { range: [2, 3], color: "#6b8e25" },
            { range: [3, 4], color: "#89b62f" },
            { range: [4, 5], color: "#a3d049" },
            { range: [5, 6], color: "#b7da71" },
            { range: [6, 7], color: "#cce59a" },
            { range: [7, 8], color: "#e0efc2" },
            { range: [8, 9], color: "#f5faeb" }
          ],
        }
      }
    ];
    var gaugeLayout = { 
      margin: { t: 0, b: 0 },
    };
    Plotly.newPlot('gauge', data, gaugeLayout);
  });
}

// Build Bubble Chart Panel
function buildBubbleChart(sample) {
  // x: otu_ids
  // y: sample_values
  // marker size: sample_values
  // colors: otu_ids
  // text values: otu_labels
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(selObj => selObj.id == sample)
    var result = resultArray[0];

    var values = result.sample_values;
    var labels = result.otu_labels;
    var idNum = result.otu_ids;

    var trace = [{
      x: idNum,
      y: values,
      text: labels,
      mode: 'markers',
      marker: {
        color: idNum,
        colorscale: 'Earth',
        size: values
      }
    }];
        
    var layout = {
      title: 'Baterium Frequency Chart',
      showlegend: false,
    };
    
    Plotly.newPlot('bubble', trace, layout);
  });
};
