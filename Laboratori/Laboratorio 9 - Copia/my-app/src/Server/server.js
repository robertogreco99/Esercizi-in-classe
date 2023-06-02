'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const { OPEN_READWRITE } = require('sqlite3');
const cors = require('cors');

// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//lista di tutti i film:
// GET /api/films
app.get('/api/films', (req, res) => {
    dao.listFilms()
      .then(film => res.json(film))
      .catch(() => res.status(500).end());
  });
/*Retrieve a list of all the films that fulfill a given filter
(i.e., the same filters described so far).*/
/*filter : all, favorites,bestrated,unseen,seen last month*/

//lista di tutti i film con filtro:
app.get('/api/films/filter/:idfilter', async (req, res) => {
  try {
    const idfilter=req.params.idfilter;
    console.log("filtro nella api "+ idfilter);
    const result = await dao.listFilmsByFilter(idfilter);
    if(result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch(err) {
    res.status(500).end();
  }
});


//lista di tutti i film dato un id:
// GET /api/films/<id>
app.get('/api/films/:id', async (req, res) => {
    try {
      const result = await dao.getFilmById(req.params.id);
      if(result.error)
        res.status(404).json(result);
      else
        res.json(result);
    } catch(err) {
      res.status(500).end();
    }
  });
  

  //aggiungere un film al db

  // POST /api/films
app.post('/api/films', [
    
    check('rating').isInt(),
    check('title').isLength({min: 1}),   // as an example
    //check('date').isDate({format: 'YYYY-MM-DD', strictMode: true})
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     console.log("array vuoto");
      return res.status(422).json({errors: errors.array()});
    }  
    const id = req.body.id;
    const film = {
        id: id,
        title : req.body.title,
        favorite: req.body.favorite,
        watchDate: req.body.watchDate,
        rating: req.body.rating,
        user: req.body.user,
      };
      console.log ("il film è : "+ film);
      console.log("id:"+ film.id, "title"+film.title,
      "favorite:"+ film.favorite,
      "watchDate:"+ film.watchDate,
      "rating:"+ film.rating,
      "user:"+ film.user);
  
      try {
        const filmid = await dao.createFilm(film);
        // Return the newly created id of the question to the caller. 
        // A more complex object can also be returned (e.g., the original one with the newly created id)
        res.status(201).json(filmid);
      } catch (err) {
        res.status(503).json({ error: `Database error during the creation of film ${film.title}`});
      }
    }
  );

  
//aggiornare un dato film
// PUT /api/answers/<id>
app.put('/api/films/:id', [
    check('rating').isInt(),
    check('title').isLength({min: 1}),   // as an example
    //check('date').isDate({format: 'YYYY-MM-DD', strictMode: true}),
    check('id').isInt()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errore validazione");
      return res.status(422).json({errors: errors.array()});
    }
  
    const film = req.body;
    // you can also check here if the id passed in the URL matches with the id in req.body,
    // and decide which one must prevail, or return an error
    film.id = req.params.id;
    console.log("film da modificare : "+film.id);
  
    try {
      const numRowChanges = await dao.updateFilm(film);
      res.json(numRowChanges);
      //res.status(200).end();
    } catch(err) {
      res.status(503).json({error: `Database error during the update of movie ${req.params.id}.`});
    }
  
  });
  

//TODO: DOCUMENTAZIONE
  //aggiornare un dato film tramite rating
// PUT /api/answers/<id>/rating

app.put('/api/films/:id/rating', [
    check('rating').isInt(),
  //  check('title').isLength({min: 1}),   // as an example
    //check('date').isDate({format: 'YYYY-MM-DD', strictMode: true}),
  //  check('id').isInt()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errore validazione");
      return res.status(422).json({errors: errors.array()});
    }
  
    const id= req.params.id;
    const rating= req.body.rating;
    const film = await(dao.getFilmById(id));
    // you can also check here if the id passed in the URL matches with the id in req.body,
    // and decide which one must prevail, or return an err

    console.log("title "+film.title);
  
    try {
      const numRowChanges = await dao.updateRating(film,rating);
      res.json(numRowChanges);
      //res.status(200).end();
    } catch(err) {
      res.status(503).json({error: `Database error during the update of movie ${req.params.id} rating.`});
    }
  
  });



//cambiare per un dato film il campo favorite

app.put('/api/films/:id/favorite', [
    //check('rating').isInt(), //TODO: check
  //  check('title').isLength({min: 1}),   // as an example
    //check('date').isDate({format: 'YYYY-MM-DD', strictMode: true}),
  //  check('id').isInt()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errore validazione");
      return res.status(422).json({errors: errors.array()});
    }
  
    const id= req.params.id;
    const film = await(dao.getFilmById(id));
    const value=!film.favorite;
    console.log("title "+film.title);
    console.log("favorite : "+ value);
  
    try {
      const numRowChanges = await dao.updateFavorite(film,value);
      res.json(numRowChanges);
      //res.status(200).end();
    } catch(err) {
      res.status(503).json({error: `Database error during the update of movie ${req.params.id} favorites.`});
    }
  
  });





//Cancellare un film
// DELETE /api/films/<id>
app.delete('/api/films/:id', async (req, res) => {
    try {
      const numRowChanges = await dao.deleteFilm(req.params.id);  
      // number of changed rows is sent to client as an indicator of success
      res.json(numRowChanges);
    } catch(err) {
      console.log(err);
      res.status(503).json({ error: `Database error during the deletion of answer ${req.params.id}.`});
    }
  });






  // Activate the server
app.listen(port, () => {
    console.log(`film server listening at http://localhost:${port}`);
  });