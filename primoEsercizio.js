"use strict"

let book = {
    author : "Roberto",
    pages : 340,
    chapterPages : [90,50,60,140],
};

//duplicare array
let book2 ={...book};

book2.pages=10;
//console.log(book);
//book 2 e book sono due cose diverse 
//console.log(book2);

//arrow function

/*const fn = (params) => {
    fai qualcosa
}*/ 

/*const raddoppia = (x) =>
{
    return x=x+x;
}
let y = raddoppia(5);
console.log(y);
*/
function counter() {
    let value =0;

    const getNext = () => {
        value++;
        return value;
    }
    return getNext ;
}

const count1= counter();
console.log(count1());
console.log(count1());
console.log(count1());


