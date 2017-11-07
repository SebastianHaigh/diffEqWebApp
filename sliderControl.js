var aSlider = document.getElementById("aSlider");
var bSlider = document.getElementById("bSlider");
var cSlider = document.getElementById("cSlider");
var ic1Slider = document.getElementById("ic1Slider");
var ic2Slider = document.getElementById("ic2Slider");
var aOutput = document.getElementById("aOutput");
var bOutput = document.getElementById("bOutput");
var cOutput = document.getElementById("cOutput");
var ic1Output = document.getElementById("ic1Output");
var ic2Output = document.getElementById("ic2Output");
//var resetButton = document.getElementById("resetButton");


aOutput.innerHTML = aSlider.value; // Display the default slider value
bOutput.innerHTML = bSlider.value;
cOutput.innerHTML = cSlider.value;
ic1Output.innerHTML = ic1Slider.value;
ic2Output.innerHTML = ic2Slider.value;

// Update the current slider value (each time you drag the slider handle)

var dO = initDataObject(0, 0, 0, 0, 0);
dO = solution(dO);
InitChart(dO.timeSeries);
poleplot([dO.root1, dO.root2]);
initBall(dO.intCon.x);
var state = 0;
var refreshIntervalId;

resetButton.onclick = function() {
	dO = updateAll(dO);
};

startButton.onclick = function() {
	if (state == 1) {
		clearInterval(refreshIntervalId);
		$("#interval3").text(refreshIntervalId);
	};
	d3.selectAll("svg > *").remove();
	dO = solution(dO);
	InitChart(dO.timeSeries);
	poleplot([dO.root1, dO.root2]);
	refreshIntervalId = ball(dO.timeSeries);
	$("#interval3").text(refreshIntervalId);
	state = 1;
};


aSlider.oninput = function() {
	dO.diffEqconts.a = (this.value)/10;
    $("#aOutput").text(dO.diffEqconts.a);
	dO = updateAll(dO);
};

bSlider.oninput = function() {
	dO.diffEqconts.b = (this.value)/10;
    $("#bOutput").text(dO.diffEqconts.b);
	dO = updateAll(dO);
};
cSlider.oninput = function() {
	dO.diffEqconts.c = (this.value)/10;
    $("#cOutput").text(dO.diffEqconts.c);
	dO = updateAll(dO);
};
ic1Slider.oninput = function() {
	dO.intCon.x = (this.value)/10;
    $("#ic1Output").text(dO.intCon.x);
	dO = updateAll(dO);
};

ic2Slider.oninput = function() {
	dO.intCon.xdash = (this.value)/10;
    $("#ic2Output").text(dO.intCon.xdash);
	dO = updateAll(dO);
};

function initDataObject(a, b, c, u, v) {
	var dataObject = {
		type: 0,
		root1: {Re: 0, Im: 0}, 
		root2: {Re: 0, Im: 0}, 
		diffEqconts: {a: a, b: b, c: c},
		intCon: {t: 0, x: u, xdash: v},
		solConstants: {A: 0, B: 0}, 
		timeSeries: [{t: 0, x: 0}],
		stepResponse: [{t: 0, x: 0}]};
	return dataObject;
};

function updateAll(dO) {
	d3.selectAll("svg > *").remove();
	dO = solution(dO);
	InitChart(dO.timeSeries);
	initBall(dO.intCon.x);
	poleplot([dO.root1, dO.root2]);
	return dO;
};

setInterval(function() {
	var solOut;
	var sign = " ";
	var signb = " ";
	var signc = " ";
	if(dO.solConstants.B<0) {
		sign = " ";
	} else {
		sign = "+";
	}
	if (dO.diffEqconts.b < 0) {
		signb = " ";
	} else {
		signb = "+";
	}
	if (dO.diffEqconts.c < 0) {
		signc = " ";
	} else {
		signc = "+";
	}
		
	
var mathOut = " " + dO.diffEqconts.a + "\\frac{d^2x}{dt^2}" +signb+ " " + dO.diffEqconts.b + "\\frac{dx}{dt}" + signc + " " + dO.diffEqconts.c + "x = 0, \\: x(0) = " + dO.intCon.x + ", x'(0) = " + dO.intCon.xdash ;

if (dO.type == 1) {
	solOut =  "x(t) = " + dO.solConstants.A.toFixed(2) + "e^{" + dO.root1.Re.toFixed(2) + "t}" +sign+ "" + dO.solConstants.B.toFixed(2) + "e^{" + dO.root2.Re.toFixed(2) + "t}";
};

if (dO.type == 2) {
solOut =  "x(t) = e^{" + dO.root1.Re.toFixed(2) + "t}(" + dO.solConstants.A.toFixed(2) + "\\cos(" + dO.root1.Im.toFixed(2) +"t)" +sign+ "" + dO.solConstants.B.toFixed(2) + "\\sin(" + Math.abs(dO.root2.Im.toFixed(2)) +"t))";
};

	var math = MathJax.Hub.getAllJax("diffEq")[0];
	MathJax.Hub.Queue(["Text",math,mathOut]);
	var math2 = MathJax.Hub.getAllJax("solEq")[0];
	MathJax.Hub.Queue(["Text",math2,solOut]);
}, 600)