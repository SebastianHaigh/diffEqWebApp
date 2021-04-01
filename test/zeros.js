const zeros = require('../zeros.js');
var Polynomial = require('polynomial');
var Complex = require('complex.js');

QUnit.module('zeros');

QUnit.test('cauchy_upper_bound', assert => {
    var p = new Polynomial([14, 3, 1]);
    assert.equal(_cauchy_upper_bound(p), 15, 'cauchy_upper_bound = 15');
});

QUnit.test('_reciprocal_root_difference', assert => {
    var c1 = Complex(1,1);
    var c2 = Complex(2,2);
    var c3 = _reciprocal_root_difference(c1, c2);
    assert.equal(c3.re, -0.5, 'The real component should be -0.5'); 
    assert.equal(c3.im, 0.5, 'The real component should be 0.5'); 
});

QUnit.test('finding_roots_monic', assert => {
    var p = new Polynomial([7, 2, 1]); // x^2 + 2x + 7
    var roots = _zeros(p);
    var num_roots = roots.length;
    assert.equal(num_roots, 2, 'There should be 2 roots');

    // There will be one positive and one negative root but they could come in any order:
    if (roots[0].im < 0) {
        // root[0] is the negative root
        assert.equal(roots[0].im.toFixed(3), -Math.sqrt(6).toFixed(3), '1st root im should be -ve');
        assert.equal(roots[1].im.toFixed(3), Math.sqrt(6).toFixed(3), '2nd root im should be +ve');
    } else {
        // root[1] is the negative root
        assert.equal(roots[0].im.toFixed(3), Math.sqrt(6).toFixed(3), '1st root im should be +ve');
        assert.equal(roots[1].im.toFixed(3), -Math.sqrt(6).toFixed(3), '2nd root im should be -ve');
    }
    assert.equal(roots[0].re.toFixed(3), -1, '');
    assert.equal(roots[1].re.toFixed(3), -1, '');
});

QUnit.test('finding_roots_non_monic', assert => {
    var p = new Polynomial([7, 2, 11]); // x^2 + 2x + 7
    var roots = _zeros(p);
    var num_roots = roots.length;
    assert.equal(num_roots, 2, 'There should be 2 roots');

    // There will be one positive and one negative root but they could come in any order:
    if (roots[0].im < 0) {
        // root[0] is the negative root
        assert.equal(roots[0].im.toFixed(3), -((2/11)*Math.sqrt(19)).toFixed(3), '1st root im should be -ve');
        assert.equal(roots[1].im.toFixed(3), ((2/11)*Math.sqrt(19)).toFixed(3), '2nd root im should be +ve');
    } else {
        // root[1] is the negative root
        assert.equal(roots[0].im.toFixed(3), ((2/11)*Math.sqrt(19)).toFixed(3), '1st root im should be +ve');
        assert.equal(roots[1].im.toFixed(3), -((2/11)*Math.sqrt(19)).toFixed(3), '2nd root im should be -ve');
    }
    assert.equal(roots[0].re.toFixed(3), (-1/11).toFixed(3), '');
    assert.equal(roots[1].re.toFixed(3), (-1/11).toFixed(3), '');
});