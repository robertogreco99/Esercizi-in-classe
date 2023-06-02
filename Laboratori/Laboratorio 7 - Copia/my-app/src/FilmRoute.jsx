import { Col, Container, Row, Button, Form, Table } from 'react-bootstrap';
import MainComponent from './MainComponent';
import SideBar from './Sidebar';
import MyHeader from './MyHeader';
import NavbarFunction from './Navbar';
import { filmlist } from './movies';



function FilmRoute(props) {
 
    return (
      <Container fluid>
         <NavbarFunction></NavbarFunction>
        <Row>
          <Col sm={4}> <SideBar setFiltro={props.setFiltro}  ></SideBar> </Col>
          <Col sm={8}>  <MyHeader filtro={props.filtro}/> <MainComponent filtro={props.filtro}/></Col>
        </Row>
      </Container>
    )
  }
  
  export default FilmRoute;
  