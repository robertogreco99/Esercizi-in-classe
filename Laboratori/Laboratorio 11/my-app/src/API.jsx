/**
 * All the API calls
 */

import dayjs from "dayjs";

const URL = 'http://localhost:3001/api';

async function getAllFilms() {
  // call  /api/questions
  const response = await fetch(URL+'/films');
  const filmlist = await response.json();
  if (response.ok) {
    //console.log (filmlist.map((e) => ({id: e.id, title:e.title, favorites: e.favorite === 1 ? true : false, date: dayjs(e.date),rating : e.rating})));
    return filmlist.map((e) => ({id: e.id, title:e.title, favorite: e.favorite === 1 ? true : false, date: dayjs(e.date) ,rating : e.rating}) )
  } else {
    throw film;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getAllFilmsByFilter(idfilter) {
  try {
    
    const response = await fetch(URL+'/films/filter/'+idfilter);
    if (!response.ok) {
      throw new Error('Errore nella richiesta al server');
    }
    const filmlist = await response.json();
    return filmlist.map((e) => ({
      id: e.id,
      title: e.title,
      favorite: e.favorite === 1 ? true : false,
      date: dayjs(e.date) ,
      rating: e.rating
    }));
  } catch (error) {
    console.log(error); // Stampa l'errore nella console per il debug
    throw new Error('Errore nella risposta del server');
  }
}


function addFilm(film) {
  // call  POST /api/answers
  return new Promise((resolve, reject) => {
    fetch(URL+'/films', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },

    body: JSON.stringify({
      id: film.id,
      title: film.title,
      favorite: film.favorite ? 1 : 0,
      watchdate: film.watchdate.format('YYYY-MM-DD'),
      rating: film.rating,
      user: 1
    })
    
    }).then((response) => {
      if (response.ok) {
        response.json()
          .then((id) => resolve(id))
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function editFilm(film) {
  // call  PUT /api/answers/<id>
  return new Promise((resolve, reject) => {
    fetch(URL+`/films/${film.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: film.id,
        title: film.title,
        favorite: film.favorite ? 1 : 0,
        watchdate: film.watchdate.format('YYYY-MM-DD'),
        rating: film.rating,
        user: 1
      })
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}


function deleteFilm(id) {
  // call  DELETE /api/answers/<id>
  return new Promise((resolve, reject) => {
    fetch(URL+`/films/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function updateFavorite(film) {
  // call  PUT /api/answers/<id>
  return new Promise((resolve, reject) => {
    fetch(URL+`/films/${film.id}/favorite`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favorite: !film.favorite
      })
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

async function logIn(credentials) {
  let response = await fetch(URL + '/sessions', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

async function logOut() {
  await fetch(URL+'/sessions/current', {
    method: 'DELETE', 
    credentials: 'include' 
  });
}

async function getUserInfo() {
  const response = await fetch(URL+'/sessions/current', {
    credentials: 'include'
  });
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}





const API = {getAllFilms,getAllFilmsByFilter,addFilm,editFilm,deleteFilm,updateFavorite,
  logIn, logOut, getUserInfo};
export default API;