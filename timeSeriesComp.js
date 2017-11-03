function makeGraph(a, b, c, ic1, ic2) {

var grid, roots, constants, data;
var InitialInput = 0;
var InitialOutput =ic1;
var InitialInputDerivative = 0;
var InitialOutputDerivative = ic2;
var initialConditions = {input: [InitialInput, InitialInputDerivative], output: [InitialOutput, InitialOutputDerivative]};

grid = makeGrid();
roots = findRoots(a,b,c);
constants = accountForInitialContitions(initialConditions, roots);

return data = solution(grid, roots, constants);
};