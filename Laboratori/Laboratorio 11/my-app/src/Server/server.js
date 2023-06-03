'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao'); // module for accessing the user info in the DB

const cors = require('cors');



/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
  function(username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });
        
      return done(null, user);
    })
  }
  ));

  // serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});


// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    return next();
  
  return res.status(401).json({ error: 'Not authenticated'});
}

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'wge8d239bwd93rkskb',   //personalize this random string, should be a secret value
  resave: false,
  saveUninitialized: false 
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());
/**********************API*************************************/

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
app.post('/api/films',isLoggedIn, [
    
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
        watchdate: req.body.watchdate,
        rating: req.body.rating,
        user: req.user.id/*req.body.user*/,
      };
      console.log ("il film è : "+ film);
      console.log("id:"+ film.id, "title"+film.title,
      "favorite:"+ film.favorite,
      "watchdate:"+ film.watchdate,
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
app.put('/api/films/:id', isLoggedIn , [
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
      const numRowChanges = await dao.updateFilm(film,req.user.id);
      res.json(numRowChanges);
      //res.status(200).end();
    } catch(err) {
      res.status(503).json({error: `Database error during the update of movie ${req.params.id}.`});
    }
  
  });
  

//TODO: DOCUMENTAZIONE
  //aggiornare un dato film tramite rating
// PUT /api/answers/<id>/rating

app.put('/api/films/:id/rating', isLoggedIn, [
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
      const numRowChanges = await dao.updateRating(film,rating,req.user.id);
      res.json(numRowChanges);
      //res.status(200).end();
    } catch(err) {
      res.status(503).json({error: `Database error during the update of movie ${req.params.id} rating.`});
    }
  
  });



//cambiare per un dato film il campo favorite

app.put('/api/films/:id/favorite', isLoggedIn,[
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
      const numRowChanges = await dao.updateFavorite(film,value,req.user.id);
      res.json(numRowChanges);
      //res.status(200).end();
    } catch(err) {
      res.status(503).json({error: `Database error during the update of movie ${req.params.id} favorites.`});
    }
  
  });





//Cancellare un film
// DELETE /api/films/<id>
app.delete('/api/films/:id', isLoggedIn, async (req, res) => {
    try {
      const numRowChanges = await dao.deleteFilm(req.params.id,req.user.id);  
      // number of changed rows is sent to client as an indicator of success
      res.json(numRowChanges);
    } catch(err) {
      console.log(err);
      res.status(503).json({ error: `Database error during the deletion of answer ${req.params.id}.`});
    }
  });


/*** Users APIs ***/

// POST /sessions 
// login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});

// ALTERNATIVE: if we are not interested in sending error messages...
/*
app.post('/api/sessions', passport.authenticate('local'), (req,res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.json(req.user);
});
*/

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});

/*** Other express-related instructions ***/



// Activate the server
app.listen(port, () => {
  console.log(`film server listening at http://localhost:${port}`);
});

