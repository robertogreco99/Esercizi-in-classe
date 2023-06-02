import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect} from 'react';
import dayjs from 'dayjs'
import { film/*, filmlist */} from "./movies";
import { useNavigate, useParams, Link } from 'react-router-dom';
import API from '../API';

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
    console.log(value);
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


export default SideBar;

