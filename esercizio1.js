/*Exercise 1: Better Scores
_Goal: basic handling of JavaScript arrays_

Develop a small JavaScript program to manage the scores given to your user in a question-and-answer website (e.g., StackOverflow).
 Scores are integer numbers, and they may be negative. You should:
 
- Define an array with all the scores you received in chronological order. For the moment:
  - Embed the scores directly in the source code.
  - Ignore the question, answer, and date that generated the score.
- Duplicate the array, but:
  - Eliminate all negative scores (call `NN` the number of negative scores that are deleted).
  - Eliminate the two lowest-ranking scores.
  - Add `NN+2` new scores, at the end of the array, with a value equal to the (rounded) average of the existing scores.
- Print both arrays, comparing the scores before and after the "improvement," and showing the averages in both cases.
*/


"use strict";

const myScores = [-12, -3, 18, 10, 4, -1, 0, 14];
//copio l'array 
//const modifiedScores = Array.from(myScores);
const modifiedScores = [...myScores];
//ordino l'array
modifiedScores.sort((a, b) => (a - b));
//devo eliminare i negativi
//splice è molto usato: lavora direttamente sull'array 
const dayjs = require('dayjs');
let now =dayjs();
console.log(now.format);


//VERSIONE MOLTO C
/*for (const val of modifiedScores)
  if (val >= 0)
    break;
  else
    NN++;
console.log(NN);
*/
// Con metodo che usa roba in un array
/*ho scritto un arrow function*/
let NN = modifiedScores.findIndex(el => el >= 0);
modifiedScores.splice(0, NN)
//eliminare i due score più bassi
//modifiedScores.shift();
//modifiedScores.shift();
//con unshift inserisco
let avg = 0;
for (const val of modifiedScores)
  avg += val;
avg = avg / modifiedScores.length;
console.log(modifiedScores);
console.log(avg);

//devo aggiungere elementi
  /*creo array di un certo numero di valori*/
  const addedArray=Array(NN).fill(avg); //riempio i valori con avg
  //metto tutto ciò che mi serve
  //const modifiedScores2=[...modifiedScores,...addedArray];

  modifiedScores.splice(modifiedScores.length,0,...addedArray)

console.log(modifiedScores);








