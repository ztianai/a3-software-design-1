$(function() {
	d3.csv('data/prepped_data.csv', function(error, data){
		var chartData;
		var xVar = 'gdp';

		var prepData = function(){
			chartData = data.map(function(d) {
				return {
					measure: d[xVar],
					id: d.country,
					category: d.region
				};
			});
		};




		prepData();

		var chart = BubbleChart();


		var chartWrapper = d3.select('#vis')
			.datum(chartData)
			.call(chart);

		
        $("input").on('change', function(){

            xVar = $(this).val();
            console.log(xVar);
            prepData();
            console.log(chartData);
            chartWrapper.datum(chartData).call(chart);
        });



	});
})