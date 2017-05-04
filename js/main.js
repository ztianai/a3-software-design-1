/* Create a scatter plot of 1960 life expectancy (gdp) versus 2013 life expectancy (life_expectancy).*/

$(function() {
    // Variables to show
    var xVar = 'gdp';
    var chartData;

    // Load data in using d3's csv function.
    d3.csv('data/prepped_data.csv', function(error, data) {
        // Put data into generic terms
        var prepData = function() {
            chartData = data.map(function(d) {
                return {
                    measure: d[xVar],
                    id: d.country,
                    category: d.region
                };
            });
        };
        prepData();
        // Define function to draw BubbleChart
        var bubble = BubbleChart().title('');

        // Create chart
        var chart = d3.select("#vis")
            .datum(chartData)
            .call(bubble);
    });
});