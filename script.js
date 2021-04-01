const DifferentialEquation = require('./differential_equation.js');

equation = new DifferentialEquation();
equation.add_term('0', 3);
equation.add_term('1', 3);
equation.add_term('1', 4);
equation.add_term('2', 8);
equation.add_term('3', 2);
equation.add_term('4', 9);
console.log(equation.get_roots());
