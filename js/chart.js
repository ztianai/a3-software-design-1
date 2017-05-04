
var BubbleChart = function() {
    var height = 500,
        width = 960,
        title = 'Chart Title',
        diameter = 900,
        text = 'id',
        colorScheme = 'schemeCategory20',
        margin = {
                top: 10,
                right: 10,
                bottom: 10,
                left: 5
            };

    var chart = function(selection) {
        var chartHeight = height - margin.bottom - margin.top;
        var chartWidth = width - margin.left - margin.right;

        selection.each(function(data) {
            var ele = d3.select(this);
            var svg = ele.selectAll("svg").data([data]);

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
                .attr('class', 'chart-title');

            var g = svgEnter.append('g')
                .attr('height', diameter)
                .attr('width', diameter)
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr("class", 'chartG');
            
            var nestedData = d3.nest()
                .key(function(d) {
                    return d.category;
                })
                .entries(data);
        
            var root = d3.hierarchy({
                values: nestedData
            }, function(d) {
                return d.values;
            });


            var pack = d3.pack() 
                .size([diameter, diameter])
                .padding(2);

            var categories = nestedData.map(function(d) {
                return d.key;
            });

            var colorScale = d3.scaleOrdinal().domain(categories).range(d3[colorScheme]);

            root.sum(function(d) {
                return +d.measure;
            }).sort(function(a, b) {
                return b.value - a.value;
            });

            pack(root);

            var nodes = g.selectAll(".node").data(root.leaves()).enter();

            function mouseover() {  // Add interactivity
                nodes.append("text")
                    .text(function(d) {
                        return d.data.id;  // Value of the text
                    });
            };


            nodes.append("circle")
                .merge(nodes)
                .attr('class', 'node')
                .on("mouseover", function(d){
                    nodes.append("text")
                    .attr('class', 'text')
                    .attr("x", d.x)
                    .attr("y", d.y + 5)
                    .style("text-anchor", "middle")
                    .text(d.data[text]);  // Value of the text
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

    chart.text = function(value) {
        if (!arguments.length) return diameter;
        text = value;
        return chart;
    };

    return chart;
};
