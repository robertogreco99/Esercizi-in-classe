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
import {Row,Col, Button } from "react-bootstrap";
import NavbarFunction from './Components/Navbar';
import MainComponent from './Components/MainComponent';
import SideBar  from './Components/Sidebar';
import MyHeader from './Components/MyHeader';
import dayjs from 'dayjs'
import { film/*, filmlist*/ } from './Components/movies';
import { BrowserRouter, Routes, Route,Link, Outlet } from 'react-router-dom';
import FilmForm from './Components/FilmForm';
import API from './API';





function Layout(props) {
  return (
  <div className='App'>
    <NavbarFunction></NavbarFunction>
    <Row>
        <Col sm={4}> <SideBar setFiltro={props.setFiltro} filtro={props.filtro}   ></SideBar> </Col>
        <Col sm={8}>  <MyHeader filtro={props.filtro}/> <Outlet />  </Col>
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

  
  useEffect( () => {
    API.getAllFilms()
      .then((list) => setList(list))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (filtro !== '') {
      API.getAllFilmsByFilter(filtro)
        .then((list) => setList(list))
        .catch((err) => console.log(err));
    }
  }, [filtro]);
  

const addToList = (title,favorite,date,rating) => {
  setList((oldList) => {
 const NewId =Math.max(...oldList.map(a=>a.id))+1;
 const filmnew = new film(NewId,title,favorite,date,rating);
  return [...oldList,filmnew];
  });
 }

 const EditList = (id,title,favorite,date,rating) =>{
   setList((oldList) => (
     oldList.map((movie) => (
       movie.id === id ? new film(movie.id, title, favorite, date, rating) : movie
     ))
   ));
   };

   const deleteFilm = (id) => {
    setList((oldFilms) => oldFilms.filter((f) => f.id !== id));
  };


return (
  <BrowserRouter>
  <div>
  <Routes>
  <Route path="/" element={<Layout filtro={filtro} setFiltro={setFiltro} filmlist={list} />}>
  <Route index element={<MainComponent mode={'view'} filmlist={list}  deleteFilm={deleteFilm} setMode= {setMode} filtro={filtro}editedAnswer={editedAnswer} setEditedAnswer={setEditedAnswer} />} />
  <Route path="add" element={<FilmForm  mode={'add'} addToList={addToList} setMode={setMode}/>} />
  <Route path="edit" element={<FilmForm  mode={'edit'}  setMode={setMode} EditList={EditList} initialValue={editedAnswer} setEditedAnswer={setEditedAnswer}/>} />
  <Route path="filter/:filterLabel" element={ <MainComponent filmlist={list} setFiltro={setFiltro} filtro={filtro}  deleteFilm={deleteFilm}/> } />
  <Route path='/*' element={<DefaultRoute />} />
  </Route>
  </Routes>
  </div>
  </BrowserRouter>
)
}

export default App
