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


const API = {getAllFilms,getAllFilmsByFilter};
export default API;