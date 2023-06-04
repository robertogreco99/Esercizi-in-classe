'use strict';
/* Data Access Object (DAO) module for accessing films */

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

// open the database
const db = new sqlite.Database('films.db', (err) => {
  if (err) throw err;
});
exports.listFilms = (user) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE user = ?';
    db.all(sql, [user], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      
      const films = rows.map((row) => {
        return {
          id: row.id,
          title: row.title,
          favorite: row.favorite,
          watchdate: row.watchdate,
          rating: row.rating,
          user: row.user,
        };
      });
      
      resolve(films);
    });
  });
};

// get all films
/*exports.listFilms = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const films = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite, date: e.watchdate, rating: e.rating, user: e.user }));
     
      resolve(films);
    });
  });
};*/


// filtered films
exports.listFilmsByFilter = (idfilter,user) => {
  console.log("filtro ricevuto " + idfilter);
  return new Promise((resolve, reject) => {
    let sql = '';

    switch (idfilter) {
      case 'All':
        sql = 'SELECT * FROM films WHERE user = ?';
        break;
      case 'Favorites':
        sql = 'SELECT * FROM films WHERE favorite=1 AND user = ?';
        break;
      case 'Best Rated':
        sql = 'SELECT * FROM films WHERE rating=5 AND user = ?';
        break;
      case 'Unseen':
        sql = 'SELECT * FROM films WHERE (watchdate IS NULL OR watchdate = "") AND user = ?'
        break;
        case 'Seen Last Month':
          sql= "SELECT * FROM films WHERE watchdate IS NOT NULL AND STRFTIME('%Y-%m-%d', watchdate) BETWEEN DATE('now', '-1 month') AND DATE('now') AND user = ?";
          
        break;
    }
    console.log("query : " + sql);
    db.all(sql, [user], (err, rows) => {
      if (err) {
        console.log('errore'+ err);
        reject(err);
        return;
      }
      const films = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite == 1? e.favorite : e.favorite, watchdate: e.watchdate, rating: e.rating, user: e.user }));
      //const films = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite === 1 ? true : false, watchdate: dayjs(e.date), rating: e.rating, user: e.user }));
      for (let i in films) 
      console.log("Film ID: " + films[i].id + ", User: " + films[i].user+  ", Favorite: " + films[i].favorite+ ", watchdate: " + films[i].watchdate);
      resolve(films);
    });
  });
};


// get all questions with the given id
exports.getFilmById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE id =?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: 'Question not found.' });
      } else {
        const films = { id: row.id, title: row.title, favorite: row.favorite, watchdate: dayjs(row.watchdate), rating: row.rating, user: row.user };
        resolve(films);
      }
    });
  });
};


// add a new film
exports.createFilm = (film) => {
  return new Promise((resolve, reject) => {
    console.log(this.lastId) // is available
    const sql = 'INSERT INTO films(id, title, favorite, watchdate, rating, user) VALUES(?,?, ?, DATE(?),?, ?)';
    db.run(sql, [this.lastID + 1, film.title, film.favorite, film.watchdate, film.rating, film.user], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};


// update an existing movie
exports.updateFilm = (film,userId) => {
  console.log('updateFilm: ' + JSON.stringify(film));
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE films SET title=?, favorite=?, watchdate=DATE(?) , rating=?, user=? WHERE id = ?  AND user = ?';
    db.run(sql, [film.title, film.favorite, film.watchdate, film.rating, film.user, film.id,userId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.changes);
    });
  });
};

// update an existing movie rating
exports.updateRating = (film, rating,userId) => {
  console.log('updateFilm: ' + JSON.stringify(film));
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE films SET rating=? WHERE id = ?  AND user = ?';
    db.run(sql, [rating, film.id,userId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.changes);
    });
  });
};

//Mark an existing film as favorite/unfavorite4
exports.updateFavorite = (film, value,userId) => {
  console.log('updateFilm: ' + JSON.stringify(film));
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE films SET favorite=? WHERE id = ? AND user = ?';
    db.run(sql, [value, film.id,userId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.changes);
    });
  });
};







// delete an existing answer
exports.deleteFilm = (id,userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM films WHERE id = ? AND user = ?';
    db.run(sql, [id,userId], function (err) {
      if (err) {
        reject(err);
        return;
      } else
        resolve(this.changes);  // return the number of affected rows
    });
  });
}