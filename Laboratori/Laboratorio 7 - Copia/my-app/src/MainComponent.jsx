import { Col, Container, Row, Button, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

import dayjs from 'dayjs'
import  FilmForm from './FilmForm';
import { film, filmlist } from "./movies";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useNavigate, useParams, Link } from 'react-router-dom';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useLocation } from 'react-router-dom';


function MyRow(props) {
  const navigate = useNavigate();
  const { e } = props;
  const [isChecked, setIsChecked] = useState(e.favorites);

  const cambiocolore = () => {
    setIsChecked(!isChecked);
    e.favorites=!e.favorites;
    console.log('il valore è '+ e.favorites);
  }
  
 

  function Stelle(rating) {
    if (rating > 5) rating = 5;
    const numStars = rating; // Arrotonda il rating al numero intero più vicino
    const fullStars = '★'.repeat(numStars); // Crea una stringa con il numero corretto di stelle piene
    const emptyStars = '☆'.repeat(5 - numStars); // Crea una stringa con il numero corretto di stelle vuote
    return fullStars + emptyStars; // Stampa le stelle a schermo
  }

  //<td> <Form.Check type="checkbox" label="Favorite"  checked={e.favorites == true ? true : false} onChange={cambiocolore}/> </td>

  return (
    <tr>
      <td>{e.id}</td>
      <td style={{ color: isChecked ? 'red' : 'black' }}>{e.title}</td>
      <td>
    <Form.Check
    type="checkbox"
    label="Favorite"
    checked={isChecked}
    onChange={cambiocolore}
  />
</td>
      <td>{e.date ? e.date.format('YYYY-MM-DD') : ''}</td>
      <td> {e.rating !== undefined ? Stelle(e.rating) : Stelle(0)} </td>
      <td> 
        <Button variant="danger" mode={props.mode} className='mx-2' onClick={()=>{props.handlechangemodeedit(e.id)}}> <i className="bi bi-pencil"></i> </Button> 
        <Button variant="success" mode={props.mode} className='mx-2' onClick={()=>{props.handleDeleteFilm(e.id)}}> <i className="bi bi-trash"></i> </Button>
      </td>
      
    </tr>
  );
}

function MyTable(props) {

  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);

  const navigate = useNavigate();
  const { filterLabel } = useParams();

  




  //const [list, setList] = useState(props.listofFilm);
  //const [mode, setMode] = useState('view');
  //const [editedAnswer,setEditedAnswer]=useState(false);
  const giorniIndietro = 30;


  function handleChangeModeAdd() {
    props.setMode('add');
    console.log('add')
  }

  function handlechangemodeedit(id) {
    props.setMode('edit');
    console.log('edit');
    console.log('id '+id);
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

  function handleAdd(title,favorites,date,rating){
    console.log('eseguito handleAdd');
    props.addToList(title,favorites,date,rating);
    props.setMode('view');
  }


  
  function handleSave(id, title,favorites,date,rating) {
    EditList(id,title,favorites,date,rating);
    console.log('post cambio '+favorites);
    props.setMode('view');
}


 const filterData = (list, filter) => {
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


 /* const filterData = (list, filter) => {
    const today = dayjs(); // Ottiene la data di oggi

    switch (filter) {
      case "All":
        return list;
      case "Favorites":
        return list.filter((e) => e.favorites);
      case "Best Rated":
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
  */
  
  const filteredList = filterData(props.listofFilm, filterLabel);
 
  //const filteredList = filterData(props.listofFilm, props.filtro);

 /* const addToList = (title,favorites,date,rating) => {
     setList((oldList) => {
    const NewId =Math.max(...oldList.map(a=>a.id))+1;
    const filmnew = new film(NewId,title,favorites,date,rating);
    //id, title, favorites, date,rating
     return [...oldList,filmnew];
     });
    }

    const EditList = (id,title,favorites,date,rating) =>{
      setList((oldList) => (
        oldList.map((movie) => (
          movie.id === id ? new film(movie.id, title, favorites, date, rating) : movie
        ))
      ));
      };
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
          </tr>
        </thead>
        <tbody>
          {filteredList.map((e, i) =>
            <MyRow e={e} key={i} mode={props.mode} setMode={props.setMode} listofFilm={props.listofFilm} handlechangemodeedit={handlechangemodeedit} handleDeleteFilm={handleDeleteFilm} />)
          }
        </tbody>
      </Table>
      <div>     
           <Link to='/add'>
           <Button >+</Button>
          </Link>
         </div>
    </>
  )
}


/* {(props.mode === 'edit') && (<FilmForm mode={props.mode} setMode={props.setMode} EditList={EditList}  handleSave={handleSave} initialValue={editedAnswer} closeForm={() => { handleResetMode(); }}
          handleResetMode={handleResetMode} >  </FilmForm>)}
         {(props.mode === 'add') && (<FilmForm mode={props.mode} setMode={props.setMode} addToList={addToList} handleAdd={handleAdd} closeForm={() => { handleResetMode(); }}
          handleResetMode={handleResetMode} >  </FilmForm>)}*/

function MainComponent(props) {

  return (<>
    <Row>
      <MyTable listofFilm={props.filmlist} filtro={props.filtro} mode={props.mode} setMode={props.setMode} editedAnswer={props.editedAnswer} 
      setEditedAnswer={props.setEditedAnswer} deleteFilm={props.deleteFilm}/>
    </Row>
  </>
  );
}

export default MainComponent;



