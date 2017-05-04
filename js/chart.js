// ScatterPlot


var BubbleChart = function() {
    // Set default values
    var height = 500,
        width = 960,
        title = 'Chart title',
        diameter = 900,
        margin = {
                top: 10,
                right: 10,
                bottom: 10,
                left: 5
            };

    // Function returned by ScatterPlot
    var chart = function(selection) {
        // Height/width of the drawing area itself
        var chartHeight = height - margin.bottom - margin.top;
        var chartWidth = width - margin.left - margin.right;

        // Iterate through selections, in case there are multiple
        selection.each(function(data) {
            // Use the data-join to create the svg (if necessary)
            var ele = d3.select(this);
            var svg = ele.selectAll("svg").data([data]);
            // Append static elements (i.e., only added once)

            var tooltip = svg.append("div")
                            .attr("class", "tooltip")
                            .style("opacity", 0);

            var svgEnter = svg.enter()
                    .append("svg")
                    .attr('height', diameter)
                    .attr('width', diameter)
                    .style("left", margin.left + "px")
                    .style("top", margin.top + "px");

            svgEnter.append('text')
                .attr('transform', 'translate(' + (margin.left + chartWidth / 2) + ',' + 20 + ')')
                .text(title)
                .attr('class', 'chart-title')
            // g element for markers
            var g = svgEnter.append('g')
                .attr('height', diameter)
                .attr('width', diameter)
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr("class", 'chartG');
            
            // Nest your data *by region* using d3.nest()
            var nestedData = d3.nest()
                .key(function(d) {
                    return d.category;
                })
                .entries(data);
        
            
            // Define a hierarchy for your data
            var root = d3.hierarchy({
                values: nestedData
            }, function(d) {
                return d.values;
            });


            // Create a *treemap function* that will compute your layout given your data structure
            var pack = d3.pack() // function that returns a function!
                .size([diameter, diameter]) // set size: scaling will be done internally
                .padding(0);

            // Get list of regions for colors
            var categories = nestedData.map(function(d) {
                return d.key;
            });

            // Set an ordinal scale for colors
            var colorScale = d3.scaleOrdinal().domain(categories).range(d3.schemeCategory10);

            root.sum(function(d) {
                return +d.measure;
            }).sort(function(a, b) {
                return b.value - a.value;
            });

            // (Re)build your treemap data structure by passing your `root` to your `treemap` function
            pack(root);

            var nodes = g.selectAll(".node").data(root.leaves()).enter();

            function mouseover() {  // Add interactivity
                nodes.append("text")
                    .text(function(d) {
                        return d.data.id;  // Value of the text
                    });
            }
            // Enter and append elements, then position them using the appropriate *styles*
            nodes.append("circle")
                .merge(nodes)
                .attr('class', 'node')
                .on("mouseover", function(d){
                    nodes.append("text")
                    .attr('class', 'text')
                    .attr("x", d.x)
                    .attr("y", d.y + 5)
                    .style("text-anchor", "middle")
                    .text(d.data.id);  // Value of the text
                })
                .on("mouseout", function(d) {
                    nodes.selectAll(".text").remove()
                })
                .transition().duration(1500)
                .attr("transform", function(d){
                    return "translate("+d.x+","+d.y+")";
                })
                .attr("x", function(d) {
                    return d.x;
                })
                .attr("y", function(d) {
                    return d.y;
                })
                .attr("r", function(d) {
                    return d.r;
                })
                .attr("fill", function(d) {
                    return colorScale(d.data.category);
                });


                          
                nodes.exit().remove();
        });
    };

    // Getter/setter methods to change locally scoped options
    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.title = function(value) {
        if (!arguments.length) return title;
        title = value;
        return chart;
    };

    chart.diameter = function(value) {
        if (!arguments.length) return diameter;
        diameter = value;
        return chart;
    };

    return chart;
};
