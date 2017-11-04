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
var resetButton = document.getElementById("resetButton");
var data;
aSlider.defaultValue = ci["a"];
bSlider.defaultValue = ci["b"];
cSlider.defaultValue = ci["c"];
ic1Slider.defaultValue = ci["ic1"];
ic2Slider.defaultValue = ci["ic2"];


aOutput.innerHTML = aSlider.value; // Display the default slider value
bOutput.innerHTML = bSlider.value;
cOutput.innerHTML = cSlider.value;
ic1Output.innerHTML = ic1Slider.value;
ic2Output.innerHTML = ic2Slider.value;

// Update the current slider value (each time you drag the slider handle)

resetButton.onclick = function() {
	d3.selectAll("svg > *").remove();
	data = makeGraph(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
	roots = findRoots(ci["a"], ci["b"], ci["c"]);
	InitChart(data, roots);
	$("#mathstuff").text("\(\frac{1}{\lambda}\)")
};

aSlider.oninput = function() {
    $("#aOutput").text((this.value)/10);
	ci["a"] = (this.value)/10;
	d3.selectAll("svg > *").remove();
	data = makeGraph(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
	roots = findRoots(ci["a"], ci["b"], ci["c"]);
	InitChart(data, roots);
};

bSlider.oninput = function() {
    $("#bOutput").text((this.value)/10);
	ci["b"] = (this.value)/10;
	d3.selectAll("svg > *").remove();
	data = makeGraph(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
	roots = findRoots(ci["a"], ci["b"], ci["c"]);
	InitChart(data, roots);
};
cSlider.oninput = function() {
    $("#cOutput").text((this.value)/10);
	ci["c"] = (this.value)/10;
	d3.selectAll("svg > *").remove();
	data = makeGraph(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
	roots = findRoots(ci["a"], ci["b"], ci["c"]);
	InitChart(data, roots);
};
ic1Slider.oninput = function() {
    $("#ic1Output").text((this.value)/10);
	ci["ic1"] = (this.value)/10;
	d3.selectAll("svg > *").remove();
	data = makeGraph(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
	roots = findRoots(ci["a"], ci["b"], ci["c"]);
	InitChart(data, roots);
};
ic2Slider.oninput = function() {
    $("#ic2Output").text((this.value)/10);
	ci["ic2"] = (this.value)/10;
	d3.selectAll("svg > *").remove();
	data = makeGraph(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
	roots = findRoots(ci["a"], ci["b"], ci["c"]);
	InitChart(data, roots);
};