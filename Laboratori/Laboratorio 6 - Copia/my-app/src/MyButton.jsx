import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs'
import { filmlist } from './movies';

function MyButton(props) {

  
  const [id, setId] = useState(
        props.mode==='edit' ? props.initialValue.id : '') ;
  //const [title, setTitle] = useState('');
  const [title, setTitle] = useState(props.mode ==='edit'? props.initialValue.title :'') ;
  const [favorites, setFavorites] = useState(props.mode === 'edit'? props.initialValue.favorites :'');
  const [date, setDate] = useState(
    props.mode==='edit'  && props.initialValue.date != undefined ? props.initialValue.date.format('YYYY-MM-DD') :
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
    props.handleResetMode();
    }
    

  }
 
  function handleSave() {
    if(title!=='') {
        props.handleSave(props.initialValue.id, title, favorites,date,rating);
        props.handleResetMode();
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

 /*
  function handleSubmit(event) {
    event.preventDefault();
    console.log('premuto submit');
   
    // Form validation
    //&if (id == '')
     // setErrorMsg('Id non valido');
     if (title === '')
      setErrorMsg('Titolo non valido');
    //else if (date === '')
      //  setErrorMsg('Data non valida');
    else if (isNaN(parseInt(rating)))
      setErrorMsg('Rating non valido');
    else if (parseInt(rating) < 0 || parseInt(rating) > 5) {
      setErrorMsg('Rating non valido');
      // setTimeout(()=>setErrorMsg(''),2000);
    }
    else {
      const e = {
        id: id,
        title: title,
        data: dayjs(date),
        favorites: favorites,
        rating: parseInt(rating),
      }
      console.log(e);
      props.addToList(e.title,e.favorites,e.data,e.rating);
      props.handleResetMode();
    } 
     
    }
*/
  
  /*<Form.Group>
                <Form.Label>Id</Form.Label>
                <Form.Control type="text" name="id"  value={id} onChange={handleID} />
            </Form.Group>*/
  return (
    <>
    {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
        <Form /*onSubmit={handleSubmit}*/>
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

            <Button variant="warning" onClick={props.handleResetMode}>Close</Button>
     </Form>
    </>
  );
}

export default MyButton;


/*

function AnswerForm(props) 

    function handleSubmit(event) {
       

    return (
        <>
        {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={date} onChange={ev => setDate(ev.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control type="text" name="text" value={text} onChange={ev => setText(ev.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Respondent</Form.Label>
                <Form.Control type="text" name="respondent" value={respondent} onChange={handleRespondent} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Score</Form.Label>
                <Form.Control type="number" name="score" value={score} onChange={handleScore} />
            </Form.Group>

            <Button type='submit' variant="primary">Add</Button>
          
        </Form>
        </>
    );

}

export default AnswerForm;


*/