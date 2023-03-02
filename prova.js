"use strict"

let book = {
    author: "Enrico",
    pages: 340,
};


function square(x) {
    let y = x * x;
    return y;
}

let cube = function c(x) {
    let y = square(x) * x;
    return y;
}

let fourth = (x) => { /*esempio di arrow function*/ 
    return square(x) * square(x); //lasciando solo return mette ; da solo il codice
}

let n = fourth(4);

console.log(n);

function hypotenuse(a, b) {
    const square = x => x*x ;
    return Math.sqrt(square(a) + square(b));
    }
    function hypotenuse(a, b) {
    function square(x) { return x*x; }
    return Math.sqrt(square(a) + square(b));
    }
