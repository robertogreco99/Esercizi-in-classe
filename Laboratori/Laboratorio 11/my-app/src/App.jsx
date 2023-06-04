
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import {useEffect} from 'react';
import { Container } from 'react-bootstrap';
import {Row,Col, Spinner} from "react-bootstrap";
import NavbarFunction from './Components/Navbar';
import MainComponent from './Components/MainComponent';
import SideBar  from './Components/Sidebar';
import MyHeader from './Components/MyHeader';
import { BrowserRouter, Routes, Route,Link, Outlet,Navigate } from 'react-router-dom';
import FilmForm from './Components/FilmForm';
import API from './API';
import { LoginForm } from './Components/AuthComponents';




function Loading(props) {
  return (
    <Spinner className='m-2' animation="border" role="status" />
  )
}

function Layout(props) {
  //{props.initialLoading ? <Loading/> : <Outlet  /> } </Col>
  return (
  <div className='App'>
    <NavbarFunction  user={props.user} logout={props.logout}></NavbarFunction>
    <Row>
        <Col sm={4}> <SideBar setFiltro={props.setFiltro} filtro={props.filtro}   ></SideBar> </Col>
        <Col sm={8}>  <MyHeader user={props.user} logout={props.logout} filtro={props.filtro}/> <Outlet  />  </Col>
        
      </Row>
  </div>
  );
  }


function DefaultRoute() {
  return(
    <Container className='App'>
      <h1>No data here...</h1>
      <h2>This is not the route you are looking for!</h2>
      <Link to='/'>Please go back to main page</Link>
    </Container>
  );
}

function App() {

  const [filtro, setFiltro] = useState(""); 
  const [mode, setMode] = useState('view');
  const [list, setList] = useState([]/*filmlist*/);
  const [editedAnswer,setEditedAnswer]=useState(false);
  const [dirty,setDirty]=useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  //const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
 



  function handleError(err) {
    console.log(err);
    let errMsg = 'Unkwnown error';
    if (err.errors)
      if (err.errors[0].msg)
        errMsg = err.errors[0].msg;
    else if (err.error)
      errMsg = err.error;      
    setErrorMsg(errMsg);
    setTimeout(()=>setDirty(true), 2000);  // Fetch correct version from server, after a while
  }
  
  useEffect(()=> {
    const checkAuth = async() => {
      try {
        // here you have the user info, if already logged in
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch(err) {
        // NO need to do anything: user is simply not yet authenticated
        //handleError(err);
      }
    };
    checkAuth();
  }, []);

  /*useEffect( () => {
    console.log("dirty : " +dirty + " user : "+user + " loggedIn: "+loggedIn)
    if (dirty && loggedIn) {
    API.getAllFilms(user) 
      .then((list) => {setList(list) ; setDirty(false);  /*setInitialLoading(false);*/ /*})
      .catch((err) => console.log(err));
    }
  }, [dirty,loggedIn]);*/
  
  useEffect(() => {
    console.log("dirty : " + dirty + " user : " + user + " loggedIn: " + loggedIn);
    if (dirty && loggedIn) {
      const fetchData = async () => {
        try {
          const userInfo = await API.getUserInfo();
          const list = await API.getAllFilms(userInfo);
          console.log("user"+userInfo);
          setList(list);
          setDirty(false);
          /*setInitialLoading(false);*/
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [dirty, loggedIn]);
  
  useEffect(() => {
    console.log("dirty : " + dirty + " user : " + user + " loggedIn: " + loggedIn);
    if (filtro !== '' && loggedIn) {
      const fetchData = async () => {
        try {
          const userInfo = await API.getUserInfo();
          const list = await API.getAllFilmsByFilter(filtro,userInfo);
          console.log("user"+userInfo);
          setList(list);
          //setDirty(false);
          /*setInitialLoading(false);*/
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [filtro, loggedIn]);
  
  
 /* useEffect(() => {
    if (filtro !== '') {
      
      API.getAllFilmsByFilter(filtro)
        .then((list) => setList(list))
        .catch((err) => console.log(err));

    }
  }, [filtro]);*/
  

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(undefined);
    setFiltro(''); 
    /* set state to empty if appropriate */
  }
  

  const loginSuccessful = (user) => {
    setUser(user);
    setLoggedIn(true);
    setDirty(true);
    // load latest version of data, if appropriate
  }
  


//const addToList = (title,favorite,watchdate,rating) => {
  const addToList = (e) => {
  /*ADD TEMPORANEA CON I COLORI*/
  setList((oldList) => {
  const NewId =Math.max(...oldList.map(a=>a.id))+1;
  e.id=NewId;
  e.status = 'added';
 //const filmnew = new film(NewId,title,favorite,date,rating);
  return [...oldList,e];
  });

 //const e = new film(-1,title,favorite,watchdate,rating);
//console.log("new film"+e.title,e.favorite,e.watchdate,e.rating);

/*add nel db*/
  API.addFilm(e)
  .then(() => setDirty(true)) 
  .catch((err) => handleError(err));
 }

 //const EditList = (id,title,favorite,date,rating) =>{
  /*const EditList = (e) =>{
   setList((oldList) => (
     oldList.map((movie) => (
       //movie.id === e.id ? new film(movie.id, title, favorite, date, rating) : movie
       movie.id === e.id ? new film(movie.id, e.title, e.favorite, e.date, e.rating) : movie
     ))
   ));
   e.status = 'updated';*/

   const EditList = (e) => {
    const updatedFilm = { ...e, status: 'updated' };
  
    setList((oldList) =>
      oldList.map((movie) => (movie.id === e.id ? updatedFilm : movie))
    );
    
    console.log(updatedFilm);
    setTimeout(4000);

   /*edit nel db*/
   API.editFilm(e)
   .then(() => setDirty(true)) 
   .catch((err) => handleError(err));

   };

   const deleteFilm = (id) => {
    //setList((oldFilms) => oldFilms.filter((f) => f.id !== id));
    setList((oldList) => oldList.map(
      e => e.id !== id ? e : Object.assign({}, e, {status: 'deleted'})
    ));

    /*delete nel db*/
    API.deleteFilm(id)
      .then(() => setDirty(true))
      .catch((err) => handleError(err));
  };
  
  const updateFilmFavorite = (e) => {
    setList((oldList) =>
      oldList.map((movie) => {
        if (movie.id === e.id) {
          return { ...movie, favorite: !movie.favorite, status: 'updated' };
        }
        return movie;
      })
    );
  
    API.updateFavorite(e)
      .then(() => setDirty(true))
      .catch((err) => handleError(err));
  };
  


return (
  <BrowserRouter>
  <div>
  <Routes>
  <Route path="/" element={<Layout user={user} logout={doLogOut} filtro={filtro} setFiltro={setFiltro} filmlist={list}  /*initialLoading={initialLoading}*/ />}>
  <Route index element={loggedIn? <MainComponent mode={'view'} user={user} logout={doLogOut}  filmlist={list}  deleteFilm={deleteFilm} setMode= {setMode} filtro={filtro}editedAnswer={editedAnswer} setEditedAnswer={setEditedAnswer} 
  updateFilmFavorite={updateFilmFavorite }/> : <Navigate replace to='/login' />} />
  <Route path="add" element={loggedIn?  <FilmForm  mode={'add'} addToList={addToList} setMode={setMode}/> : <Navigate replace to='/' /> } />
  <Route path="edit" element={loggedIn?  <FilmForm  mode={'edit'}  user={user} logout={doLogOut} setMode={setMode} EditList={EditList} initialValue={editedAnswer} setEditedAnswer={setEditedAnswer}/> : <Navigate replace to='/' /> } />
  <Route path="filter/:filterLabel" element={ loggedIn? <MainComponent user={user} logout={doLogOut} filmlist={list} setFiltro={setFiltro} filtro={filtro}  deleteFilm={deleteFilm}  updateFilmFavorite={updateFilmFavorite }/> : <Navigate replace to='/' /> } />
  <Route path='login' element={loggedIn? <Navigate replace to='/' />:  <LoginForm loggedIn={loggedIn }loginSuccessful={loginSuccessful} />} />
  <Route path='/*' element={<DefaultRoute />} />
  </Route>
  </Routes>
  </div>
  </BrowserRouter>
)
}

export default App
