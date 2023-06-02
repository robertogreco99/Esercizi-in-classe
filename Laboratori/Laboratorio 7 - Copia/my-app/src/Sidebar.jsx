import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs'
import { film, filmlist } from "./movies";
import { useNavigate, useParams, Link } from 'react-router-dom';



/*.filmlist.forEach( (f) => f.printFilm() )*/

/*



*/
function SideBar(props) {

 // const [list, setList] = useState(props.setFilter);

  const [filtro,setFiltro] =useState('');
  const navigate = useNavigate();

   function handleClickAll(event) {
    event.preventDefault();
    const value = event.target.getAttribute("value");
    props.setFiltro(value);
    navigate('/filter/All');
  }
  
  
  const handleClickFavorites = (event) => {
    event.preventDefault();
    const value = event.target.getAttribute("value");
    props.setFiltro(value);
    navigate('/filter/Favorites');
  }

  
  const handleClickBestRated= (event) => {
    event.preventDefault();
    const value = event.target.getAttribute("value");
    props.setFiltro(value);
    navigate('/filter/BestRated');
  
    
  }

  const handleClickSeenLastMonth = (event) => {
    event.preventDefault();
    const value = event.target.getAttribute("value");
    props.setFiltro(value);
    navigate('/filter/Seen Last Month');
  }


  const handleClickUnseen = (event) => {
    event.preventDefault();
    const value = event.target.getAttribute("value");
    props.setFiltro(value);
    navigate('/filter/Unseen');
  
  }

  return (
    <div className="sidebar " style={{ height: '100%', width: '100%', padding: 'none' , backgroundColor:'white'  }}>
      <ul className="list-group">
      
        <li className="list-group-item list-group-item-action list-group-item-dark bg-white">
          <a href="#" name="All" value="All" onClick={handleClickAll} style={{textDecoration: 'none',color: 'black'} }><i className="fs-4 bi bi-film"></i> All</a>
        </li>
        
        <li className="list-group-item list-group-item-action list-group-item-dark bg-white">
          <a href="#" name="Favorites" value="Favorites" onClick={handleClickFavorites} style={{textDecoration: 'none',color: 'black'}}><i className="fs-4 bi bi-heart"></i> Favorites</a>
        </li>
        <li className="list-group-item list-group-item-action list-group-item-dark bg-white">
          <a href="#" name="BestRated" value="Best Rated" onClick={handleClickBestRated} style={{textDecoration: 'none',color: 'black'}}><i className="fs-4 bi bi-bookmark-star-fill"></i> BestRated</a>
        </li>
        <li className="list-group-item list-group-item-action list-group-item-dark bg-white">
          <a href="#" name="SeenLastMonth" value="Seen Last Month" onClick={handleClickSeenLastMonth} style={{textDecoration: 'none',color: 'black'}}><i className="fs-4 bi bi-bookmark-check"></i> Seen Last Month</a>
        </li>
        <li className="list-group-item list-group-item-action list-group-item-dark bg-white">
          <a href="#" name="Unseen" value="Unseen" onClick={handleClickUnseen} style={{textDecoration: 'none',color: 'black'}}><i className="fs-4 bi bi-bookmark"></i> Unseen</a>
        </li>
      </ul>
    </div>
  );
  }  

//RETURN CHE FUNZIONA PRIMA ORA METTO LINK

/*
return (
  <div className="sidebar " style={{ height: '100%', width: '100%', padding: 'none' , backgroundColor:'white'  }}>
    <ul className="list-group">
      <li className="list-group-item list-group-item-action list-group-item-dark bg-white">
        <a href="#" name="All" value="All" onClick={handleClickAll} style={{textDecoration: 'none',color: 'black'} }><i className="fs-4 bi bi-film"></i> All</a>
      </li>
      <li className="list-group-item list-group-item-action list-group-item-dark bg-white">
        <a href="#" name="Favorites" value="Favorites" onClick={handleClickFavorites} style={{textDecoration: 'none',color: 'black'}}><i className="fs-4 bi bi-heart"></i> Favorites</a>
      </li>
      <li className="list-group-item list-group-item-action list-group-item-dark bg-white">
        <a href="#" name="BestRated" value="Best Rated" onClick={handleClickBestRated} style={{textDecoration: 'none',color: 'black'}}><i className="fs-4 bi bi-bookmark-star-fill"></i> BestRated</a>
      </li>
      <li className="list-group-item list-group-item-action list-group-item-dark bg-white">
        <a href="#" name="SeenLastMonth" value="Seen Last Month" onClick={handleClickSeenLastMonth} style={{textDecoration: 'none',color: 'black'}}><i className="fs-4 bi bi-bookmark-check"></i> Seen Last Month</a>
      </li>
      <li className="list-group-item list-group-item-action list-group-item-dark bg-white">
        <a href="#" name="Unseen" value="Unseen" onClick={handleClickUnseen} style={{textDecoration: 'none',color: 'black'}}><i className="fs-4 bi bi-bookmark"></i> Unseen</a>
      </li>
    </ul>
  </div>
);

*/


















/*
  return (
    <div className="sidebar  bg-light"  style={{ height: '100%', width: '100%' }}>
      <ul>
        <a href="#"  className="list-group-item list-group-item-action list-group-item-dark bg-light" name="All" value="All" onClick={handleClickAll}> <i className="fs-4 bi bi-film"></i> All</a>
        <hr style={{ borderColor: 'black' }} />
        <a href="#"  className="list-group-item list-group-item-action list-group-item-dark bg-light" name="Favorites" value="Favorites" onClick={handleClickFavorites}> <i className="fs-4 bi bi-heart"></i>  Favorites</a>
        <hr style={{ borderColor: 'black' }} />
        <a href="#"  className="list-group-item list-group-item-action list-group-item-dark bg-light" name="BestRated" value="Best Rated" onClick={handleClickBestRated}> <i className="fs-4 bi bi-bookmark-star-fill"></i> BestRated</a>
        <hr style={{ borderColor: 'black' }} />
        <a href="#"  className="list-group-item list-group-item-action list-group-item-dark bg-light" name="SeenLastMonth" value="Seen Last Month" onClick={handleClickSeenLastMonth}> <i className="fs-4 bi bi-bookmark-check"></i> Seen Last Month</a>
        <hr style={{ borderColor: 'black' }} />
        <a href="#"  className="list-group-item list-group-item-action list-group-item-dark bg-light" name="Unseen" value ="Unseen" onClick={handleClickUnseen}> <i className="fs-4 bi-bookmark"></i> Unseen</a>
      </ul>
    </div>
  );
}
*/
  
export default SideBar;

    /*return (

        <div className="list-group list-group-flush bg-light">
        <a href="#" className="list-group-item list-group-item-action list-group-item-dark bg-light"> <i className="fs-4 bi bi-film"></i> All</a>
        <a href="#" className="list-group-item list-group-item-action list-group-item-dark bg-light"> <i className="fs-4 bi-heart"></i> Favorites</a>
        <a href="#" className="list-group-item list-group-item-action list-group-item-dark bg-light"> <i className="fs-4 bi bi-bookmark-star-fill"></i> Best Rated</a>
        <a href="#" className="list-group-item list-group-item-action list-group-item-dark bg-light"> <i className="fs-4 bi-bookmark-check"></i> Seen Last Month</a>
        <a href="#" className="list-group-item list-group-item-action list-group-item-dark bg-light"> <i className="fs-4 bi-bookmark"></i> Unseen</a>
      </div>
        )
  }
*/

