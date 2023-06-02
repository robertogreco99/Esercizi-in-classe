'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database('exams.sqlite', (err) => { if (err) throw err; });
let result = [];
let sql = "SELECT * FROM course LEFT JOIN score ON course.code=score.coursecode";
db.all(sql, (err, rows) => { // da come risultato una tabella , parametri err e rows (callback con due parametri)
    if (err) throw err;
    for (let row of rows) {
        //console.log(row);
        console.log(row.code, row.name);
        result.push(row); //aggiunge all'array vuoto la riga
        //portare fuori i dati : li passo a una variabile che sta fuori
        //result: closure -> db all non sa niente di result, result sa di db all
    }
});
console.log('********************');
//voglio stampare dopo che result è stato riempito: perchè per ora non ci sto riuscendo
//col timer si potrebbe fare
//serve un meccanismo alternativo: portare codice dentro la callback
for (let row of result) {
    console.log(row.code, row.name);
}
console.log('*** END of list ***');
