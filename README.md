# jmerkel_Module_12
Plotly

### Project Summary
This dashboard was built with increased functionality to visualize the bacterial data for each volunteer. Included in these visualizations is a bar chart of the top 10 bacterial species found in each volunteer, a gauge of washing frequency, and a bubble chart to show a complete overview of the data sample. On page initialization and whenever a new volunteer number is selected, the displays update to show the correct data.A

### Outline of functionality
This dashboard uses data stored in a JSON file called "samples.json". For this readme, the term "dataset" is referring to the data found in this file. Each panel is built whenever the page is initialized and again whenever a volunteer is selected using the drop down menu. Each panel uses the volunteer's name (id#) to filter the complete dataset to the applicable information.

##### Initialization
Upon page load, the dashboard executes initialization script. Here, it pulls name metadata from the dataset in order to populate the dropdown menu "selDataset". Once this occurs, the script takes the ID of the first volunteer, and initializes each panel with their information.

##### Meta Data
The first panel that is built is the MetaData panel. This panel compiles the background information on the volunteer that is found in the "metadata" portion of the data. It uses the "Object.Entries()" function to display each key and value of the information.

##### Bar Chart
The second panel built is the Bar Chart. This chart displays a horizontal bar chart of the top 10 bacterium found with the values in descending order. This is done using the slice() function on the arrays in the sample object to limit the plot to the first 10 items. Additionally, in order to correctly display the bacterial id axis, the map() function is used to preface the otu_id with "OTU" (since the ids are purely numerical). To display the plot in descending order, the layout needed to specify the yaxis autorange as "reversed".

##### Gauge
The Gauge displays each volunteer's scrubbing frequency over a range of 0 to 9 by using an indicator-Gauge/number plot. The data used here is the same as the data in the Meta Data data set, but limited even further to the wFreq data.

##### Bubble Chart
The final panel that is built is the Bubble Chart. This plot uses each volunteer's complete sample dataset visualize the range, frequency, and labels of each bacteria found in the sample. This plot uses the sample "otu_ids" as the x axis and as a basis for the color range, "sample_values" as the y axis and marker size, and the text values are populated via the "otu_labels". In order to make the plot visually appealing, an "earth" colorscale was applied.
