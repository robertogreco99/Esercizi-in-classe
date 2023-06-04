import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs'
import { useNavigate, useParams, Link } from 'react-router-dom';
import StarRating  from './StarRating';
function FilmForm(props) {

  const navigate = useNavigate();
  const [id, setId] = useState(
        props.mode==='edit' ? props.initialValue.id : '') ;
  const [title, setTitle] = useState(props.mode ==='edit'? props.initialValue.title :'') ;
  const [favorite, setfavorite] = useState(props.mode === 'edit'? props.initialValue.favorite :'');
  const [watchdate, setWatchdate] = useState(
    props.mode==='edit'  && props.initialValue.watchdate !='' ? props.initialValue.watchdate/*.format('YYYY-MM-DD')*/:
   '') ;
  const [rating, setRating] = useState(props.mode ==='edit' && props.initialValue.rating != undefined ? props.initialValue.rating :'');
  const [user, setUser] = useState(props.mode ==='edit' && props.initialValue.user!= undefined ? props.initialValue.user :'');
  const [errorMsg, setErrorMsg] = useState('');
 

  //TODO: check sulla data
  function handleAdd () {
    const e = {
      id: 0,
      title: title,
      watchdate: dayjs(watchdate),
      favorite: favorite,
      rating: rating,
      user : user, 
    }
    console.log("data" + e.watchdate);
    if(title==''){
    setErrorMsg('Titolo non valido');
    }
    else if (rating <0 && rating >5){
      setErrorMsg('Rating non valido')
    }
     else {
    //props.addToList(title,favorite,dayjs(date),parseInt(rating));
    console.log(e);
    props.addToList(e);

    console.log('aggiunge alla lista');
    //props.handleResetMode();
    navigate('/');
    }
    

  }
 
  function handleSave() {
    if(title!=='') {
      const e = {
        id: id,
        title: title,
        watchdate: dayjs(watchdate),
        favorite: favorite,
        rating: rating,
        user : user, 
      }
        //props.handleSave(props.initialValue.id, title, favorite,date,rating);
        //props.EditList(id,title,favorite,date,rating);
        props.EditList(e);
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

  function handlefavorite(event) {
    const v = event.target.value;
    setfavorite(v);
  }
  function handleDate(event) {
    const v = event.target.value;
    setWatchdate(v); 
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
                <Form.Label>favorite</Form.Label>
                <Form.Control type="text" name="favorite" value={favorite} onChange={handlefavorite}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={watchdate} onChange={handleDate} />
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


