"use strict";

/*const deleteAfterTimeout = (msg) =>
{
    console.log(msg);
}

setTimeout(deleteAfterTimeout,2000,"Ciao");*/

/*const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('How old are you? ', (answer) => {
    let description = answer;
    rl.close();
});*/


const sqlite = require ('sqlite3');

const db =new sqlite.Database('exams.sqlite', (err) => {if (err) throw err;})