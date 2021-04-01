import { Polynomial } from "polynomial"
import { Complex } from "complex.js"

Polynomial.setField("C");

interface RootFindingStrategy {
    algorithm(polynomial: Polynomial): RootContainer;
}

export class AberthRootFindingStrategy implements RootFindingStrategy {
    constructor() {}
    algorithm(polynomial: Polynomial) {
        var roots : {[key:string] : Root} = {};
        roots[0] = new RealRoot(1);
        roots.push = new ComplexRoot(2);
        return roots;
    }
}

class RootContainer {
    constructor() {}
}

interface Root {
    get_real(): number;
    get_imaginary(): number;
    get_complex(): Complex;
    //is_real(): boolean;
    //is_complex(): boolean;
}

export class RealRoot implements Root {

    private value: number;

    constructor(root_value: number = 0) {
        this.value = root_value;
    }

    get_real(): number {
        return this.value;
    }

    get_imaginary(): number {
        return 0;
    }

    get_complex(): Complex {
        return new Complex(this.value, this.get_imaginary());
    }
}

export class ComplexRoot implements Root {

    private value: number;

    constructor(root_value: number = 0) {
        this.value = root_value;
    }

    get_real(): number {
        return this.value;
    }

    get_imaginary(): number {
        return 0;
    }

    get_complex(): Complex {
        return new Complex(this.value, this.get_imaginary());
    }
}

var roots : {[key:string] : Root} = {};
        roots[0] = new RealRoot(1);
        roots[1] = new ComplexRoot(2);
        console.log(roots);