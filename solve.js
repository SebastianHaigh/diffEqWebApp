makeGrid = function() {
	var i;
	var dt = 0.1;
	var grid = [];
  
	for (i = 0; i < 1000; i++) {
		grid[i] = dt * i;
	}
	return grid;
};

distinctRealRoots = function(constants, roots, point) {
	outputPoint = constants[0]*Math.exp((roots["root1"][0])*point) + constants[1]*Math.exp((roots["root2"][0])*point);
	outputData = {x: point, y: outputPoint};
	return outputData;
};

complexRoots = function(constants, roots, point) {
	
	var sigma = (roots["root1"][0]);
	var omega = Math.abs((roots["root1"][1]));
	
	var e1 = Math.exp(sigma*point);
	var cos1 = Math.cos(omega*point);
	var sin1 = Math.sin(omega*point);
	
	outputPoint = e1*(constants[0]*cos1 + constants[1]*sin1);
	outputData = {x: point, y: outputPoint};
	
	return outputData;
};

repeatedRoots = function(constants, roots, point) {
	outputPoint = Math.exp(roots["root1"][0]*point)*(constants[0]*point + constants[1]);
	outputData = {x: point, y: outputPoint};
	return outputData;
};

solution = function(grid, roots, constants) {

	solutionTimeSeries = [];

	if (roots["type"] == 1 || roots["type"] == 4) {
		var i;
		for (i = 0; i < grid.length; i++) {
			solutionTimeSeries[i] = distinctRealRoots(constants, roots, grid[i]);
		}
	}

	if (roots["type"] == 2) {
	var i;
	for (i = 0; i < grid.length; i++) {
		solutionTimeSeries[i] = complexRoots(constants, roots, grid[i]);
		}
	}

	if (roots["type"] == 3) {
	var i;
	for (i = 0; i < grid.length; i++) {
		solutionTimeSeries[i] = repeatedRoots(constants, roots, grid[i]);
		}
	}

	return solutionTimeSeries;
};