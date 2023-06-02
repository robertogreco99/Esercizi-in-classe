import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Container } from 'react-bootstrap';
import {Row,Col, Button } from "react-bootstrap";
import NavbarFunction from './Navbar';
import  MyHeader from './MyHeader';
import  MainComponent from './MainComponent';
import SideBar  from './Sidebar';
import MyButton from './MyButton'
import dayjs from 'dayjs'
import { filmlist } from './movies';



function App() {

  const [filtro, setFiltro] = useState(""); // filtro sidebar
 

  return (
    <Container fluid>
       <NavbarFunction></NavbarFunction>
      <Row>
        <Col sm={4}> <SideBar setFiltro={setFiltro}  ></SideBar> </Col>
        <Col sm={8}>  <MyHeader filtro={filtro}/> <MainComponent filtro={filtro}/></Col>
      </Row>
    </Container>
  )
}

export default App
