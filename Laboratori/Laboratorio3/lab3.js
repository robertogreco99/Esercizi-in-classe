"use strict";

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('films.db', (err) => { if (err) throw err; });
//db.close();

/*let sql = "SELECT * FROM films WHERE title= 'Pulp Fiction'" ;
db.all(sql, (err,rows)=>{
if(err) throw err ;
for (let row of rows) {
console.log(row);
}
});*/

function film(id, title, favorites, date, rating) {
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date && dayjs(date);
    this.rating = rating;

    this.formatRating = () => {
        return this.rating ? this.rating : '<not assigned>';
    }

    this.favoriteR = () => {
        return this.favorites ? this.favorites : '<not assigned>';
    }

    this.dateF = () => {
        return this.date ? dayjs(this.date).format('MMMM-DD-YYYY') : '<not defined>';
    }
    this.toString = () => {
        return `Id: ${this.id}, ` +
            `Title: ${this.title}, Favorite: ${this.favoriteR()}, Score: ${this.formatRating()}, ` +
            `watchDate: ${this.dateF()}`;
    }

    this.printFilm = () => {
        console.log(this.toString());
    }


}

function FilmLibrary() {
    const db = new sqlite.Database('films.db', (err) => { if (err) throw err; });

    this.filmlist = [];
    this.addNewFilm = (film) => {
        this.filmlist.push(film);
    }

    this.filmLibraryPrint = () => {
        this.filmlist.forEach((f) => f.printFilm())
    }


    this.deleteFilm = (idfilm) => {
        let newlist = this.filmlist.filter((x) => x.id != idfilm);
        this.filmlist = newlist;

    }

    this.resetWatchedFilms = () => {
        return this.filmlist.forEach((x) => (x.date = ''));
    }


    this.sortByDate = () => {
        const new_array = [...this.filmlist];
        new_array.sort((f1, f2) => {
            if (f1.date === f2.date)
                return 0;
            else if (typeof f1.date === 'undefined')
                return 1;
            else if (typeof f2.date === 'undefined')
                return -1;
            else
                return f1.date.diff(f2.date)
        });
        return new_array;
    }

    this.getRated = () => {
        let newlist = this.filmlist.filter((x) => typeof x.rating !== 'undefined').sort((a, b) => (a - b));
        return newlist;
    }


    //Get all the films stored in the database and return (a Promise that resolves to) an array of Film objects

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films';
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {

                    const films = rows.map(record => new film(record.id, record.title, record.favorite, record.watchdate, record.rating));
                    resolve(films);
                    /*for (let row of rows){
                        console.log("--------record-----------");
                        row = new film(row.id,row.title,row.favorite,row.date,row.rating);
                        row.printFilm();
                    }*/

                }
            });
        });
    };

    //Get all the favorite films stored in the database and return (a Promise that resolves to) an array of Film objects.
    this.getFavorites = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE favorite=1 ';
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    const films = rows.map(record => new film(record.id, record.title, record.favorite, record.date, record.rating));
                    /*for (let row of rows){
                        console.log("-------favorite film -----------");
                        row = new film(row.id,row.title,row.favorite,row.date,row.rating);
                        row.printFilm();
                    }*/
                    resolve(films);
                }
            });
        });
    };


    //Get all the films watched today stored in the database and return (a Promise that resolves to) an array of Film objects.

    this.getwatchedToday = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE watchdate=?';
            const today = dayjs().format('YYYY-MM-DD');
            db.all(query, [today], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    const films = rows.map(record => new film(record.id, record.title, record.favorite, record.date, record.rating));
                    resolve(films);
                }
            });
        });
    };

    /*Get, through a parametric query, the films stored in the database whose watch date is earlier than a given date received as a parameter. Return 
    (a Promise that resolves to) an array of Film objects.*/
    this.getwatchedbefore = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE watchdate < ?';
            let date = "2023-03-21";
            const dateCreate = dayjs(date).format('YYYY-MM-DD');
            db.all(query, [dateCreate], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    const films = rows.map(record => new film(record.id, record.title, record.favorite, record.date, record.rating));
                    resolve(films);
                }
            });
        });
    };

    /* Get, through a parametric query, the films in the database whose rating is greater than or equal to a given number received as a parameter. Return (a Promise that resolves to) an array of Film objects.
      Get, through*/
    this.getratingGT = (rate) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE rating >= ?';
            db.all(query, [rate], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    const films = rows.map(record => new film(record.id, record.title, record.favorite, record.date, record.rating));
                    resolve(films);
                }
            });
        });
    };

    this.gettitle = (title) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE title LIKE ? ';
            db.all(query, [title], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    const films = rows.map(record => new film(record.id, record.title, record.favorite, record.date, record.rating));
                    resolve(films);
                }
            });
        });
    };
    this.gettitlebyId = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE id = ? ';
            db.all(query, [id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    const films = rows.map(record => new film(record.id, record.title, record.favorite, record.date, record.rating));
                    resolve(films);
                }
            });
        });
    };
    
    this.addNewFilm = (film) => {
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO films(id, title, favorite, watchdate, rating) VALUES(?, ?, ?, ?, ?)';
          const parameters = [film.id, film.title, film.favorite, film.date.format('YYYY-MM-DD'), film.rating];
          db.run(query, parameters, function (err) {  
            if (err)
              reject(err);
            else
              resolve(this.lastID);
          });
        });
      };

      this.addFilmToLibrary = (film) => {
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO films(id, title, favorite, watchdate, rating) VALUES(?, ?, ?, ?, ?)';
          const parameters = [film.id, film.title, film.favorites, film.date.format('YYYY-MM-DD'), film.rating];
          db.run(query, parameters, function (err) { 
            if (err)
              reject(err);
            else
              resolve(this.lastID);
          });
        });
      };
    
      this.deletefilmFromLibrary = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM films WHERE id = ?`, id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

this.deleteWatchDate = () => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE films SET watchdate = NULL', [], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  



}

const f1 = new film(6, "A silent voice", true, "2022-03-10", 5);
//const f2 = new film(2, "21 Grams", true, "2022-03-17", 4);
//const f3 = new film(3, "Star Wars", false);
//const f4 = new film(4,"Natrix",false);
//const f5 = new film(5,"Shrek",false,"2023-03-21",3);

const filmLibrary = new FilmLibrary();

//const filmLibrary2 = new FilmLibrary();
/*filmLibrary.addNewFilm(f1);
filmLibrary.addNewFilm(f2);
filmLibrary.addNewFilm(f4);
filmLibrary.addNewFilm(f5);*/
//console.log("------------------------");
//filmLibrary2.addNewFilm(f2);
//filmLibrary2.filmLibraryPrint();
//console.log("------------------------");



async function main() {

    const filmLibrary = new FilmLibrary();
    console.log('\n****** Film nel database ******');
    const films = await filmLibrary.getAll();
    if (films.length === 0)
        console.log('Non ci sono film nel database');
    else
        films.forEach((f) => f.printFilm());

   /* console.log('\n****** Film preferiti******');
    const favoritesfilms = await filmLibrary.getFavorites();
    if (favoritesfilms.length === 0)
        console.log('Non ci sono film preferiti');
    else
        favoritesfilms.forEach((f) => f.printFilm());

    console.log('\n****** Film visti oggi******');
    const filmwatchedtoday = await filmLibrary.getwatchedToday();
    if (filmwatchedtoday.length === 0)
        console.log('Non ci sono film visti oggi');
    else
        filmwatchedtoday.forEach((f) => f.printFilm());

    console.log('\n****** Film visti prima di 2023-03-21 ******');
    const filmwatchedbefore = await filmLibrary.getwatchedbefore();
    if (filmwatchedbefore.length === 0)
        console.log('Non ci sono film visti prima di 2023-03-21');
    else
        filmwatchedbefore.forEach((f) => f.printFilm());


    console.log('\n****** Film con rating >= 2 ******');
    const filmratinggt = await filmLibrary.getratingGT(2);
    if (filmratinggt.length === 0)
        console.log('Non ci sono film con rating >=2');
    else
        filmratinggt.forEach((f) => f.printFilm());

    console.log('\n****** Film con titolo = Matrix  ******');
    const filmtitle = await filmLibrary.gettitle('Matrix');
    if (filmtitle.length === 0)
        console.log('Non ci sono film con titolo =MATRIX');
    else
        filmtitle.forEach((f) => f.printFilm());

    console.log('\n****** Film con id = 5  ******');
    const filmtitleID = await filmLibrary.gettitlebyId('5');
    if (filmtitleID.length === 0)
        console.log('Non ci sono film con ID=5');
    else
        filmtitleID.forEach((f) => f.printFilm());*/



    //add film
  /*console.log('\n******  Add Film con id = 6  ******');
  const f1 = new film(6, "A silent voice", 1, "2022-03-11", 5);
  f1.printFilm();
  filmLibrary.addFilmToLibrary(f1).then(() => {
    console.log('Elemento aggiunto');
  })
  .catch((err) => {
    console.error(err);
  })*/

  // delete a film 
  /*console.log('\n******  Delete Film con id = 3  ******');
  filmLibrary.deletefilmFromLibrary(2)  .then(() => {
    console.log('Elemento cancellato');
  })
  .catch((err) => {
    console.error(err);
  })*/

    //delete watchDate
    /*console.log('\n******  Delete WatchDate  ******');
   
    filmLibrary.deleteWatchDate().then(() => {
      console.log('Operazione effettuata');
    })
    .catch((err) => {
      console.error(err);
    })*/

    /*console.log("Post Operazioni");
   console.log('\n****** Film nel database ******');
    const filmspost = await filmLibrary.getAll();
    if (filmspost.length === 0)
        console.log('Non ci sono film nel database');
    else
        filmspost.forEach((f) => f.printFilm());
*/
  
  


}
main();
db.close();

