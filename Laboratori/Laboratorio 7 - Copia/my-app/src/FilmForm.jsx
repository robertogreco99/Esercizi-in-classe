import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs'
import { filmlist } from './movies';
import { useNavigate, useParams, Link } from 'react-router-dom';

function FilmForm(props) {

  const navigate = useNavigate();
  const [id, setId] = useState(
        props.mode==='edit' ? props.initialValue.id : '') ;
  const [title, setTitle] = useState(props.mode ==='edit'? props.initialValue.title :'') ;
  const [favorites, setFavorites] = useState(props.mode === 'edit'? props.initialValue.favorites :'');
  const [date, setDate] = useState(
    props.mode==='edit'  && props.initialValue.date !='' ? props.initialValue.date/*.format('YYYY-MM-DD')*/:
   '') ;
  const [rating, setRating] = useState(props.mode ==='edit' && props.initialValue.rating != undefined ? props.initialValue.rating :'');
  const [errorMsg, setErrorMsg] = useState('');
 

  function handleAdd () {
    const e = {
      id: id,
      title: title,
      data: dayjs(date),
      favorites: favorites,
      rating: parseInt(rating),
    }
    console.log(e);
     
    
    if(title==''){
    setErrorMsg('Titolo non valido');
    }
    else if (rating <0 && rating >5){
      setErrorMsg('Rating non valido')
    }
     else {
    props.addToList(title,favorites,date,rating);
    console.log('aggiunge alla lista');
    //props.handleResetMode();
    navigate('/');
    }
    

  }
 
  function handleSave() {
    if(title!=='') {
        //props.handleSave(props.initialValue.id, title, favorites,date,rating);
        props.EditList(id,title,favorites,date,rating);
        console.log('edit fatto al film');
        navigate('/');
        //props.handleResetMode();
    } else {
      setErrorMsg('Some data are missing') ;
    }
}
  
  function handleID(event) {
    const v = event.target.value;
    setId(v);
  }

  function handleTitle(event) {
    const v = event.target.value;
    setTitle(v);
  }

  function handleFavorites(event) {
    const v = event.target.value;
    setFavorites(v);
  }
  function handleDate(event) {
    const v = event.target.value;
    setDate(v); 
  }
  function handleRating(event) {
    const v = event.target.value;
    setRating(v);
  }

  return (
    <>
    {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
        <Form >
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={title} onChange={handleTitle}/> 
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Favorites</Form.Label>
                <Form.Control type="text" name="favorites" value={favorites} onChange={handleFavorites}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={date} onChange={handleDate} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" name="rating" value={rating} onChange={handleRating}  style={{marginBottom: '10px'}} />
            </Form.Group>
            
              { props.mode ==='add' && <Button variant="primary" onClick={handleAdd } style={{marginRight: '10px'}}>Add</Button>}
              { props.mode ==='edit' && <Button variant="info" onClick={ handleSave } style={{marginRight: '10px'}}>Save</Button>}

            <Link to='/'>
            <Button variant="warning" >Close</Button>
            </Link>
     </Form>
    </>
  );
}

export default FilmForm;


