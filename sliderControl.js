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

aSlider.oninput = function() {
	
    $("#aOutput").text((this.value)/10);
	ci["a"] = (this.value)/10;
	d3.selectAll("svg > *").remove();
	InitChart(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
};

bSlider.oninput = function() {
	var num = (this.value)/10;
	var b = Math.abs(num.toFixed(1));
	if (num < 0) {
		$("#bSign").text("-");
	} else {
		$("#bSign").text("+");
	}
    $("#bOutput").text(b);
	ci["b"] = (this.value)/10;
	d3.selectAll("svg > *").remove();
	InitChart(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
};
cSlider.oninput = function() {
    $("#cOutput").text((this.value)/10);
	ci["c"] = (this.value)/10;
	d3.selectAll("svg > *").remove();
	InitChart(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
};
ic1Slider.oninput = function() {
    $("#ic1Output").text((this.value)/10);
	ci["ic1"] = (this.value)/10;
	d3.selectAll("svg > *").remove();
	InitChart(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
};
ic2Slider.oninput = function() {
    $("#ic2Output").text((this.value)/10);
	ci["ic2"] = (this.value)/10;
	d3.selectAll("svg > *").remove();
	InitChart(ci["a"], ci["b"], ci["c"], ci["ic1"], ci["ic2"]);
};