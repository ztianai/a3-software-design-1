$(function() {
    var xVar = 'gdp';
    var chartData;

    d3.csv('data/prepped_data.csv', function(error, data) {
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
        var bubble = BubbleChart().title('My Bubble Chart')
                                  .text('id');

        var chart = d3.select("#vis")
            .datum(chartData)
            .call(bubble);
    });
});