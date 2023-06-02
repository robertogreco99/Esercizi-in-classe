import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



//  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
//<i classNameName="bi bi-person-square mr-2" style="font-size: 2rem; color: ghostwhite; margin-right: 15px;"></i> 
//<i classNameName="bi bi-collection-play-fill " style="font-size: 1rem"></i>

function NavbarFunction() {
    return (
        <Navbar bg="primary" variant="dark">
            <Container fluid>
            <Col sm={4}>
                        <i className="bi bi-collection-play-fill" style={{ fontSize: 50, color: 'white' }} > </i>
                        <a className="navbar-brand" href="#">Film Library</a>
             </Col>
             <Col sm={4}>
                        <form className="form-inline">
                            <input type="search" id="form1" className="form-control" placeholder="Search" aria-label="Search" />
                        </form>
            </Col>
            <Col sm={4} >
            <div className="collapse navbar-collapse justify-content-end">
                    <i className="bi bi-person-square mr-2" style={{ fontSize: 50, color: 'white', marginRight: 15 }} > </i>
            </div>
            </Col>
            </Container>
        </Navbar>
    )
}

export default NavbarFunction;