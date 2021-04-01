const DifferentialEquation = require('../differential_equation.js');

QUnit.module('differential_equation');

QUnit.test('add to equation', assert => {
    var e = new DifferentialEquation();
    e.add_term('2', 8);
    assert.equal(e.terms['2'], 8, '2nd Order term coefficient should be 8');
});

QUnit.test('add terms with same order', assert => {
    var e = new DifferentialEquation();
    assert.equal(e.num_terms(), 1, 'There should only be one term');
    e.add_term('2', 8);
    assert.equal(e.terms['2'], 8, '2nd Order term coefficient should be 8');
    e.add_term('2', -5);
    assert.equal(e.terms['2'], 3, '2nd Order term coefficient should be 3');
    assert.equal(e.num_terms(), 2, 'There should only be one term');
});

QUnit.test('has term 0', assert => {
    var e = new DifferentialEquation();
    e.has_term('0');
    assert.true(e.has_term('0'), 'New Equation should have term zero');
});