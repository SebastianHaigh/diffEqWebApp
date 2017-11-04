var ci = {a: 1.4, b: 0.7, c: 3, ic1: 1, ic2: 1};
data = makeGraph(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
poles = findRoots(ci["a"], ci["b"], ci["c"]);
InitChart(data, poles);
function InitChart(lineData, pole) {

  //var lineData = makeGraph(a, b, c, ic1, ic2);
  //var pole = findRoots(a, b, c);
  
  sigma1 = pole["root1"][0];
  omega1 = pole["root1"][1];
  sigma2 = pole["root2"][0];
  omega2 = pole["root2"][1];
  poles = [[sigma1, omega1], [sigma2, omega2]];
  
  ball(lineData);
  poleplot(poles);
  
  var timeSeries = d3.select("#visualisation"),
    WIDTH = 500,
    HEIGHT = 300,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 100
    },
    xRange = d3.scale.linear()
		.range([MARGINS.left, WIDTH - MARGINS.right])
		.domain([
		d3.min(lineData, function (d) { return d.x; }),
		d3.max(lineData, function (d) { return d.x;})]),

    yRange = d3.scale.linear()
		.range([HEIGHT - MARGINS.top, MARGINS.bottom])
		.domain([
		(-1)*d3.max(lineData, function (d) { return d.y;}),
		d3.max(lineData, function (d) { return d.y;})]),

    xAxis = d3.svg.axis()
		.scale(xRange)
		.tickSize(5)
		.tickSubdivide(true),

    yAxis = d3.svg.axis()
		.scale(yRange)
		.tickSize(5)
		.orient("left")
		.tickSubdivide(true);

    timeSeries.append("svg:g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (HEIGHT/2) + ")")
		.call(xAxis);

	timeSeries.append("svg:g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + (MARGINS.left) + ",0)")
		.call(yAxis);

	var lineFunc = d3.svg.line()
		.x(function (d) { return xRange(d.x); })
		.y(function (d) { return yRange(d.y); })
		.interpolate('basis');

	timeSeries.append("svg:path")
		.attr("d", lineFunc(lineData))
		.attr("stroke", "#FF6700")
		.attr("stroke-width", 2)
		.attr("fill", "none");

};

function ball(data) {

	var ball = d3.select("#ball").attr("width",1200).style("height",100);

	
	var initPosition = 600+Math.floor(data[0].y)*100;
	var mycircle = ball.append("circle")
		.attr("cx",initPosition)
		.attr("cy",50)
		.style("fill","#CC008E")
		.attr("r",20);
	
	

	setInterval(function() {		  
		var p = data.shift();
		var v = p.y*100+600;
		v = Math.floor(v);

		mycircle.transition()
			.duration(10)
			.attr("cx",v)
			.attr("cy",50)
			.style("fill","#CC008E")
			.attr("r",20)
	}, 10);

};

function poleplot(dataset) {
	
	var w = 300;
	var h = 300;
	var padding = 20;
				
			//Create scale functions
	var pxScale = d3.scale.linear()
		.domain([-10, 10])
		.range([padding, w - padding * 2]);

	var pyScale = d3.scale.linear()
		.domain([-5, 5])
		.range([h - padding, padding]);

	var prScale = d3.scale.linear()
		.domain([-6, 6])
		.range([2, 5]);

			//Define X axis
	var pxAxis = d3.svg.axis()
		.scale(pxScale)
		.orient("bottom")
		.ticks(5);

			//Define Y axis
	var pyAxis = d3.svg.axis()
		.scale(pyScale)
		.orient("left")
		.ticks(5);

			//Create SVG element
	var svg = d3.select("#poleplot")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

			//Create circles
	svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("stroke", "#45FF00")
		.attr("fill", "#45FF00")
		.attr("cx", function(d) { return pxScale(d[0]); })
		.attr("cy", function(d) { return pyScale(d[1]); })
		.attr("r", function(d) { return prScale(d[1]); });
			//Create X axis
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (h + padding/10)/2 + ")")
		.call(pxAxis);
			
			//Create Y axis
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + (w-padding)/2 + ",0)")
		.call(pyAxis);
				
};