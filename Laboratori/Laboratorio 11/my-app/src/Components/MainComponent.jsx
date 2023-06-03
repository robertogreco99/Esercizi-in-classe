import { Col, Container, Row, Button, Table, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsStarFill, BsStar } from 'react-icons/bs';


import dayjs from 'dayjs'
import  FilmForm from './FilmForm';
import { film/*,filmlist */} from "./movies";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useNavigate, useParams, Link } from 'react-router-dom';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useLocation } from 'react-router-dom';


function MyRow(props) {
  const navigate = useNavigate();
  const { e } = props;
 
  let statusClass = null;
  

 
  switch(e.status) {
   
    case 'added':
      statusClass = 'table-success';
      break;
    case 'deleted':
      statusClass = 'table-danger';
      break;
    case 'updated':
      statusClass = 'table-warning';
      break;
    default:
      break;
  }
  
 
 
  /*function Stelle(rating) {
    if (rating > 5) rating = 5;
    const numStars = rating;
     /* L'underscore _ viene utilizzato per indicare che il valore dell'elemento non è utilizzato all'interno della funzione di callback.
    Per ogni elemento, viene creato un componente <BsStarFill /> per le stelle piene o <BsStar /> per le stelle vuote. 
    La chiave univoca viene generata utilizzando l'indice dell'elemento nell'array.
    const fullStars = Array(numStars).fill().map((_, index) => <BsStarFill key={`full-${index}`} />); // Aggiungi la chiave univoca per le stelle piene
    const emptyStars = Array(5 - numStars).fill().map((_, index) => <BsStar key={`empty-${index}`} />); // Aggiungi la chiave univoca per le stelle vuote
    return (
      <>
        {fullStars}
        {emptyStars}
      </>
    );
  }*/

  function Stelle(rating) {
    if (rating > 5) rating = 5;
    const numStars = rating; // Arrotonda il rating al numero intero più vicino
    const fullStars = '★'.repeat(numStars); // Crea una stringa con il numero corretto di stelle piene
    const emptyStars = '☆'.repeat(5 - numStars); // Crea una stringa con il numero corretto di stelle vuote
    return fullStars + emptyStars; // Stampa le stelle a schermo
  }

  //<td> <Form.Check type="checkbox" label="Favorite"  checked={e.favorites == true ? true : false} onChange={cambiocolore}/> </td>
 
  return (
    //<tr>
    <tr className={statusClass}> 
      <td>{e.id}</td>
      <td style={{ color: e.favorite ? 'red' : 'black' }}>{e.title}</td>
      <td>
      <Form.Check
          type="checkbox"
          label="Favorite"
          checked={e.favorite === true ? true : false }
          onChange={()=>{props.handleChangeFavorite(e)}}
        />
    </td>
     
      <td>{e.date && e.date.isValid() ? e.date.format('YYYY-MM-DD') : ''}</td> 
      <td> {e.rating !== undefined ? Stelle(e.rating) : Stelle(0)} </td>
      <td> 
        <Button variant="danger" mode={props.mode} className='mx-2' disabled={e.user !== props.userId}  onClick={()=>{props.handlechangemodeedit(e.id)}}> <i className="bi bi-pencil"></i> </Button> 
        <Button variant="success" mode={props.mode} className='mx-2' disabled={e.user !== props.userId} onClick={()=>{props.handleDeleteFilm(e.id)}}> <i className="bi bi-trash"></i> </Button>
      </td>
      <td>{e.user ? e.user :  'undefined'}</td>

    </tr>
  );
}
 //<td>{e.date ? e.date.format('YYYY-MM-DD') : ''}</td>
function MyTable(props) {

  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
 

  const navigate = useNavigate();
  const { filterLabel } = useParams();


  const giorniIndietro = 30;


  function handleChangeModeAdd() {
    props.setMode('add');
    console.log('add')
  }

  function handlechangemodeedit(id) {
    props.setMode('edit');
    console.log('edit');
    console.log(' id '+id);
    console.log(props.listofFilm.filter((a) => (a.id === id))[0]) ;
    props.setEditedAnswer(props.listofFilm.filter((a) => (a.id === id))[0]);
    console.log('modifica'+props.editedAnswer);
    //setEditedAnswer(props.filmlist.filter((a)=>(a.id==id))[0]);
    navigate('/edit');
  }


  function handleDeleteFilm(id){
    console.log(props);
    props.deleteFilm(id);
  }
 /* function handleResetMode() {
    props.setMode('view');
  }*/
  function handleChangeFavorite(e) {
    console.log(e.status);
    props.updateFilmFavorite(e);
    
  }
  function handleAdd(title,favorite,date,rating){
    console.log('eseguito handleAdd');
    props.addToList(title,favorite,date,rating);
    props.setMode('view');
  }


  
  function handleSave(id, title,favorite,date,rating) {
    EditList(id,title,favorite,date,rating);
    console.log('post cambio '+favorite);
    props.setMode('view');
}



 /*const filterData = (list, filter) => {
    const today = dayjs(); // Ottiene la data di oggi

    switch (filter) {
      case "All":
        return list;
      case "Favorites":
        return list.filter((e) => e.favorites);
      case "BestRated":
        return list.filter((e) => e.rating && e.rating == 5);
      case "Unseen":
        return list.filter((e) => e.date === undefined);
      case "Seen Last Month":
        return list.filter((e) => {
          if (!e.date) {
            return false; // se la data non è definita, l'elemento non deve essere incluso nell'elenco filtrato
          }
          const formattedDate = e.date.format('YYYY-MM-DD');
          const startDate = today.subtract(giorniIndietro, 'day').format('YYYY-MM-DD');
          const endDate = today.format('YYYY-MM-DD');
          return dayjs(formattedDate).isSameOrBefore(endDate) && dayjs(formattedDate).isAfter(startDate)
        });

      default:
        return list;
    }
  };
  const filteredList = filterData(props.listofFilm, filterLabel);
 */
  return (
    <>
      <Table>
        {/* <Table striped bordered hover> */}
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Favorite</th>
            <th>WatchDate</th>
            <th>Rating</th>           
            <th>Edit</th>
            <th>User</th>
            
          </tr>
        </thead>
        <tbody>
          {props.listofFilm.map((e, i) =>
            <MyRow e={e} userId={props.user && props.user.id} key={i} mode={props.mode} setMode={props.setMode} /*listofFilm={props.listofFilm}*/handleChangeFavorite={handleChangeFavorite} handlechangemodeedit={handlechangemodeedit} handleDeleteFilm={handleDeleteFilm} />)
          }
        </tbody>
      </Table>
      <div>     
      <Button variant='success' onClick={()=>navigate('/add')} disabled={props.user?.id? false : true}>+</Button>
           
         </div>
    </>
  )
}

/*<Link to='/add'>
           <Button disabled={props.user?.id? false : true}  >+ </Button>
          </Link>*/

function MainComponent(props) {

  return (<>
    <Row>
      <MyTable listofFilm={props.filmlist} user={props.user} filtro={props.filtro} mode={props.mode} setMode={props.setMode} editedAnswer={props.editedAnswer} 
      setEditedAnswer={props.setEditedAnswer} deleteFilm={props.deleteFilm} updateFilmFavorite={props.updateFilmFavorite} />
    </Row>
  </>
  );
}

export default MainComponent;



