//Esercizio 1 : Better Scores

"use strict";

const myScores = [-12, -3, 18, 10, 4, -1, 0, 14];

//Copiare il vettore

//metodo 1:
//let modifiesScores2 = Array.from(myScores);
//console.log(modifiesScores2);

//metodo2
const modifiedScores = [...myScores];
//console.log(modifiedScores);

//Sort del vettore
modifiedScores.sort( (a,b) => (a-b));
//console.log(modifiedScores);


//elimina tutti gli score negativi (pari a NN)

/*for (const val of modifiedScores)
    if (val >= 0)
        break;
    else
        NN++;*/


let NN = modifiedScores.findIndex( el => el >= 0);
modifiedScores.splice(0,NN);
//console.log(modifiedScores);
//elimina i due più bassi
//modifiedScores.shift();
//modifiedScores.shift();
//console.log(modifiedScores);


//aggiungi NN+2 nuovi score alla fine con un 
//valore pari alla media degli score esistenti 

let avg=0;
 
for (const val of modifiedScores)
    avg+=val; 

avg=avg/modifiedScores.length;


const addedArray = Array(NN).fill(avg); 
//const modifiedScores2 = [...modifiedScores,...addedArray];

modifiedScores.splice(modifiedScores.length, 0, ...addedArray );
console.log(modifiedScores);