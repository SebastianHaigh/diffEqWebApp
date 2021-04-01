const zeros = require('./zeros.js');
const Polynomial = require('polynomial');

class DifferentialEquation {
    constructor() {
        this.terms = {'0': 0};
    };

    add_term(order, coefficient) {
        if (this.has_term(order)) {
            this.terms[order] += coefficient;
        } else {
            this.terms[order] = coefficient;
        }
    };

    remove_term(order) {
        if (this.has_term(order)){
            delete this.terms[order];
        }
    }

    get_roots() {
        return _zeros(new Polynomial(this.terms));
    }

    has_term(order) {
        return (order in this.terms);
    }

    degree() {
        var i = -10000000000;
        for (var k in this.terms) {
            i = Math.max(k, i);
        }
        return i;
    }

    num_terms() {
        return Object.keys(this.terms).length;
    }


};

module.exports = DifferentialEquation;