import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs'

function MyButton(props) {

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [favorites, setFavorites] = useState(false);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [rating, setRating] = useState();

  const [errorMsg, setErrorMsg] = useState('');
 
  
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

  function handleSubmit(event) {
    event.preventDefault();
    console.log('premuto submit');

    // Form validation
    if (id == '')
      setErrorMsg('Id non valido');
    else if (title === '')
      setErrorMsg('Titolo non valido');
    /*else if (date === '')
        setErrorMsg('Data non valida');*/
    else if (isNaN(parseInt(rating)))
      setErrorMsg('Score non valido');
    else if (parseInt(rating) < 0) {
      setErrorMsg('Rating negativo non valido');
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
      props.addToList(e);
     
    }

  }

  return (
    <>
    {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Id</Form.Label>
                <Form.Control type="text" name="id" value={id} onChange={handleID} />
            </Form.Group>

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

            <Button type='submit' variant="primary" style={{marginRight: '10px'}}>Add</Button>

            <Button type='submit' variant="warning" onClick={props.closeForm}>Close Form</Button>
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