import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs'
import MyButton from './MyButton';
import { film, filmlist } from "./movies";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';



function MyRow(props) {
  const { e } = props;
  const [isChecked, setIsChecked] = useState(e.favorites);

  const cambiocolore = () => {
    setIsChecked(!isChecked);
  }
  
 

  function Stelle(rating) {
    if (rating > 5) rating = 5;
    const numStars = rating; // Arrotonda il rating al numero intero più vicino
    const fullStars = '★'.repeat(numStars); // Crea una stringa con il numero corretto di stelle piene
    const emptyStars = '☆'.repeat(5 - numStars); // Crea una stringa con il numero corretto di stelle vuote
    return fullStars + emptyStars; // Stampa le stelle a schermo
  }


  return (
    <tr>
      <td>{e.id}</td>
      <td style={{ color: isChecked ? 'red' : 'black' }}>{e.title}</td>
      <td> <Form.Check type="checkbox" label="Favorite"  checked={e.favorites == true ? true : false} onChange={cambiocolore}/> </td>
      <td>{e.date ? e.date.format('YYYY-MM-DD') : ''}</td>
      <td> {e.rating !== undefined ? Stelle(e.rating) : Stelle(0)} </td>
      <td><Button variant="danger" mode={props.mode} className='mx-2' damodificare={e.id} onClick={()=>{props.handlechangemodeedit(e.id)}}> Edit</Button></td>
    </tr>
  );
}

/*/*{e.favorites ? 
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          checked={isChecked}
          onChange={cambiocolore}
          style={{ marginRight: '5px' }}
        /> :
        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={cambiocolore} style={{ marginRight: '5px' }}></input>}

        <label className="form-check-label">
          Favorites
        </label>
        */

function MyTable(props) {

  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);

  const [list, setList] = useState(props.listofFilm);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState('view');
  const [editedAnswer,setEditedAnswer]=useState(false);
  const giorniIndietro = 30;


  function handleChangeModeAdd() {
    setMode('add');
    console.log('add')
  }

  function handlechangemodeedit(id) {
    setMode('edit');
    console.log('edit');
    console.log('id '+id);
    console.log(props.listofFilm.filter((a) => (a.id === id))[0]) ;
    setEditedAnswer(props.listofFilm.filter((a) => (a.id === id))[0]);
    //setEditedAnswer(props.filmlist.filter((a)=>(a.id==id))[0]);
    setShowForm(true);
  }
  function handleResetMode() {
    setMode('view');
  }

  function handleAdd(title,favorites,date,rating){
    props.addToList(title,favorites,date,rating);
    setMode('view');
  }
  
  function handleSave(id, title,favorites,date,rating) {
    EditList(id,title,favorites,date,rating);
    console.log('post cambio '+favorites);
    setMode('view');
}




  const filterData = (list, filter) => {
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
  const filteredList = filterData(list, props.filtro);


  const addToList = (title,favorites,date,rating) => {
/*
const e = {
        id: id,
        title: title,
        data: dayjs(date),
        favorites: favorites,
        rating: parseInt(rating),
      }**/
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
            <MyRow e={e} key={i} mode={mode} listofFilm={props.listofFilm} handlechangemodeedit={handlechangemodeedit} />)
          }
        </tbody>
      </Table>
      <div>
        {(mode === 'edit') && (<MyButton mode={mode} EditList={EditList}  handleSave={handleSave} initialValue={editedAnswer} closeForm={() => { handleResetMode(); }}
          handleResetMode={handleResetMode} >  </MyButton>)}
         {(mode === 'add') && (<MyButton mode={mode} addToList={addToList} handleAdd={handleAdd} closeForm={() => { handleResetMode(); }}
          handleResetMode={handleResetMode} >  </MyButton>)}
        {(mode === 'view') && (<Button onClick={() => {setShowForm(true); handleChangeModeAdd();}}>+</Button>)}
         </div>
    </>
  )
}



function MainComponent(props) {
  return (<>
    <Row>
      <MyTable listofFilm={filmlist} filtro={props.filtro} />
    </Row>
  </>
  );
}

export default MainComponent;



