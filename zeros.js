var Complex = require('complex.js');
var Polynomial = require('polynomial');

_zeros = function(polynomial) {
    Polynomial.setField("C");
    // The Aberth method will be used to find the roots of the polynomial
    var roots = _aberth_initial_roots(polynomial);
    var derivative = polynomial.derive();

    for (let index = 0; index < 100; index++) {
        roots = _aberth_iteration(roots, polynomial, derivative);
    }

    //for (let index = 0; index < roots.length; index++) {
    //    roots[index].re = roots[index].re.toFixed(3);
    //    roots[index].im = roots[index].im.toFixed(3);
   // }
    return roots;
}

_cauchy_upper_bound = function(polynomial) {
    var cauchy_array = [];

    // Convert the polynomial to a monic polynomial.
    var polynomial_monic = polynomial.monic();

    // Extract the coefficients from the polynomial, extract the keys to the coefficient object.
    var coefficients = polynomial_monic.coeff;
    var coefficient_keys = Object.keys(coefficients);

    var num_coefficients = coefficient_keys.length;

    for (let index = 0; index < num_coefficients - 1; index++) {
        this_key = coefficient_keys[index];
        cauchy_array.push(Math.abs(coefficients[this_key]));
    }
    return 1 + Math.max(...cauchy_array);
};

_aberth_iteration = function(roots, polynomial, derivative) {

    //                           p(z_k)/p'(z_k)
    //  w_k = -----------------------------------------------------
    //          (1 - (p(z_k)/p'(z_k))) * sum_{j\neq k} (1/(z_k-z_j))
    //
    w = [];
    roots.forEach(root => {
        var aberth_ratio = _aberth_ratio(root, polynomial, derivative);
        var sum_of_reciprocal_root_differences = _sum_of_reciprocal_root_differences(root, roots);
        var denominator = Complex.ONE.sub(aberth_ratio.mul(sum_of_reciprocal_root_differences));
        var this_w = aberth_ratio.div(denominator);
        w.push(this_w);
    });
    for (let index = 0; index < roots.length; index++) {
        roots[index] = roots[index].sub(w[index]);
    }
    return roots;
};

_aberth_initial_roots = function(polynomial) {
    // This function generates inital roots for the aberth algoritm, 
    // these roots are randomly selected points from the complex plane 
    // the magnitude of which is less than the cauchy upper bound.
    var num_roots = polynomial.degree();
    var upper_bound = _cauchy_upper_bound(polynomial);
    var initial_roots = [];
    var scaling_factor = 0;
    var angle = 0;
    for (let index = 0; index < num_roots; index++) {
        scaling_factor = Math.random() * upper_bound;
        angle = Math.random() * Math.PI * 2;
        initial_roots.push(new Complex({phi: angle, r: scaling_factor})); 
    }
    return initial_roots;
};

_aberth_ratio = function(root, polynomial, derivative) {
    var polynomial_at_root = polynomial.eval(root);
    var derivative_at_root = derivative.eval(root);
    return polynomial_at_root.div(derivative_at_root);
};

_sum_of_reciprocal_root_differences = function(root_k, roots) {
    var sum = Complex.ZERO;
    roots.forEach(root => {
        if (!root_k.equals(root)) {
            sum = sum.add(_reciprocal_root_difference(root_k, root));
        }
    });
    return sum;
};

_reciprocal_root_difference = function(root1, root2) {
    return Complex.ONE.div((root1.sub(root2)));
};