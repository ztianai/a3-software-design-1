# a3-software-design

Documentation for Bubblechart()

Bubblechart can be utilized in order to generate packed bubble charts easily in d3.

To get started, it is necessary to ensure data is formatted correctly. Follow these steps to prep
your data and create your own bubble chart!

Step 1: Load the data
Step 2: Format the data by using map to create a new dataset. It is important in your map function 
    to return your measure, id, and category. These will be the three values necessary to create a bubble chart. The measure will be the size of your circles, id will be the identifier in the dataset, and category will be the value that your bubbles will be grouped together by. An example would be 

    myData = data.map(function(d) {
                return {
                    measure: d.x,
                    id: d.y,
                    category: d.category
                };

Step 3: Then you can create the chart by creating a variable that stores BubbleChart(). Additional parameters on BubbleChart() that can be added are title, width, hieght, diameter, and text. 
    title: Sets the title of the chart
    width: Sets the width of the area for the chart (in pixels)
    height: Sets the height of the area for the chart (in pixels)
    diameter: Sets the diameter for the actual bubble chart
    text: Sets the label for your circles
    colorScheme: Sets the d3 color scheme for the chart

Step 4: Create the chart by selecting the area in your html you want to generate the chart and calling datum() with your data from step 2, as well as a call() on your BubbleChart() variable.