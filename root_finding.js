"use strict";
exports.__esModule = true;
exports.ComplexRoot = exports.RealRoot = exports.AberthRootFindingStrategy = void 0;
var polynomial_1 = require("polynomial");
var complex_js_1 = require("complex.js");
polynomial_1.Polynomial.setField("C");
var AberthRootFindingStrategy = /** @class */ (function () {
    function AberthRootFindingStrategy() {
    }
    AberthRootFindingStrategy.prototype.algorithm = function (polynomial) {
        var roots = {};
        roots[0] = new RealRoot(1);
        roots.push = new ComplexRoot(2);
        return roots;
    };
    return AberthRootFindingStrategy;
}());
exports.AberthRootFindingStrategy = AberthRootFindingStrategy;
var RootContainer = /** @class */ (function () {
    function RootContainer() {
    }
    return RootContainer;
}());
var RealRoot = /** @class */ (function () {
    function RealRoot(root_value) {
        if (root_value === void 0) { root_value = 0; }
        this.value = root_value;
    }
    RealRoot.prototype.get_real = function () {
        return this.value;
    };
    RealRoot.prototype.get_imaginary = function () {
        return 0;
    };
    RealRoot.prototype.get_complex = function () {
        return new complex_js_1.Complex(this.value, this.get_imaginary());
    };
    return RealRoot;
}());
exports.RealRoot = RealRoot;
var ComplexRoot = /** @class */ (function () {
    function ComplexRoot(root_value) {
        if (root_value === void 0) { root_value = 0; }
        this.value = root_value;
    }
    ComplexRoot.prototype.get_real = function () {
        return this.value;
    };
    ComplexRoot.prototype.get_imaginary = function () {
        return 0;
    };
    ComplexRoot.prototype.get_complex = function () {
        return new complex_js_1.Complex(this.value, this.get_imaginary());
    };
    return ComplexRoot;
}());
exports.ComplexRoot = ComplexRoot;
var roots = {};
roots[0] = new RealRoot(1);
roots[1] = new ComplexRoot(2);
console.log(roots);
