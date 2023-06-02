import { useState } from 'react';
import {useEffect} from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container } from 'react-bootstrap';
import {Row,Col, Button ,Spinner} from "react-bootstrap";
import NavbarFunction from './Components/Navbar';
import MainComponent from './Components/MainComponent';
import SideBar  from './Components/Sidebar';
import MyHeader from './Components/MyHeader';
import dayjs from 'dayjs'
import { film/*, filmlist*/ } from './Components/movies';
import { BrowserRouter, Routes, Route,Link, Outlet } from 'react-router-dom';
import FilmForm from './Components/FilmForm';
import API from './API';




function Loading(props) {
  return (
    <Spinner className='m-2' animation="border" role="status" />
  )
}

function Layout(props) {
  return (
  <div className='App'>
    <NavbarFunction></NavbarFunction>
    <Row>
        <Col sm={4}> <SideBar setFiltro={props.setFiltro} filtro={props.filtro}   ></SideBar> </Col>
        <Col sm={8}>  <MyHeader filtro={props.filtro}/> 
        {props.initialLoading ? <Loading/> : <Outlet /> } </Col>
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
  const [dirty,setDirty]=useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);



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
  
  useEffect( () => {
    if (dirty) {
    API.getAllFilms() 
      .then((list) => {setList(list) ; setDirty(false);  setInitialLoading(false);})
      .catch((err) => console.log(err));
    }
  }, [dirty]);

  useEffect(() => {
    if (filtro !== '') {
      
      API.getAllFilmsByFilter(filtro)
        .then((list) => setList(list))
        .catch((err) => console.log(err));

    }
  }, [filtro]);
  

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
  <Route path="/" element={<Layout filtro={filtro} setFiltro={setFiltro} filmlist={list}  initialLoading={initialLoading} />}>
  <Route index element={<MainComponent mode={'view'} filmlist={list}  deleteFilm={deleteFilm} setMode= {setMode} filtro={filtro}editedAnswer={editedAnswer} setEditedAnswer={setEditedAnswer} 
  updateFilmFavorite={updateFilmFavorite }/>} />
  <Route path="add" element={<FilmForm  mode={'add'} addToList={addToList} setMode={setMode}/>} />
  <Route path="edit" element={<FilmForm  mode={'edit'}  setMode={setMode} EditList={EditList} initialValue={editedAnswer} setEditedAnswer={setEditedAnswer}/>} />
  <Route path="filter/:filterLabel" element={ <MainComponent filmlist={list} setFiltro={setFiltro} filtro={filtro}  deleteFilm={deleteFilm}  updateFilmFavorite={updateFilmFavorite }/> } />
  <Route path='/*' element={<DefaultRoute />} />
  </Route>
  </Routes>
  </div>
  </BrowserRouter>
)
}

export default App
