const RootFinding = require('../root_finding.js');
const Polynomial = require('polynomial');
const Complex = require('complex.js');

QUnit.module('root_finding');

QUnit.test('test_aberth_strategy_object_creation', assert => {
    var a = new RootFinding.AberthRootFindingStrategy();
    assert.equal(a.constructor.name, 'AberthRootFindingStrategy');
});

QUnit.test('test_real_root_object_creation', assert => {
    var root = new RootFinding.RealRoot(1);
    assert.equal(root.constructor.name, 'RealRoot');
    assert.equal(root.get_real(), 1);
});

QUnit.test('test_real_root_object_creation_without_value', assert => {
    var root = new RootFinding.RealRoot();
    assert.equal(root.constructor.name, 'RealRoot');
    assert.equal(root.get_real(), 0);
});

QUnit.test('test_get_imaginary_component_of_real_root', assert => {
    var root = new RootFinding.RealRoot(5);
    assert.equal(root.get_real(), 5);
    assert.equal(root.get_imaginary(), 0);
});

QUnit.test('test_get_complex_representation_of_real_root', assert => {
    var root = new RootFinding.RealRoot(5);
    assert.equal(root.get_real(), 5);
    assert.deepEqual(root.get_complex(), new Complex(5, 0));
});