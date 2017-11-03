var ball = d3.select("svg").attr("width",960).style("height",600);

var mycircle = ball.append("circle")
	.attr("cx",100)
	.attr("cy",100)
	.style("fill","blue")
	.attr("r",20)

	
function moveBall(data) {
for (i = 0; i < 1000; i++) {

mycircle  // wait 2 seconds, then slowly change the circle's properties
	.transition()
	.duration(300)
	.attr("cx",100)
	.attr("cy",100)
	.style("fill","orange")
	.attr("r",20);
}
};