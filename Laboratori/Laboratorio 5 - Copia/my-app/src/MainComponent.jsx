import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs'
import MyButton from './MyButton';
import { film, filmlist } from "./movies";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

/* 

function film(id, title, favorites, date,rating) {
    this.id=id;
    this.title=title;
    this.favorites=favorites;
    this.date=date && dayjs(date);
    this.rating=rating;
};
const filmlist = [  
    new film(1, "TheEndofEvangelion", true, "2022-03-10", 5),
    new film(2, "A silent voice", false, "2022-03-17", 4),
    new film(3, "Spirited Away", true),
    new film(4,"Ghost in the shell",false),
    new film(5,"Quintessential quintuplets",false,"2023-03-21",3),
];
*/



function MyRow(props) {
    const { e } = props;
    let ratings = e.rating ? e.rating :  0;
    const [isChecked, setIsChecked] = useState(e.favorites);
    
    const cambiocolore = () => {
      setIsChecked(!isChecked);
    }

    function Stelle(rating) {
      if(rating > 5) rating =5;
      const numStars = rating; // Arrotonda il rating al numero intero più vicino
      const fullStars = '★'.repeat(numStars); // Crea una stringa con il numero corretto di stelle piene
      const emptyStars = '☆'.repeat(5 - numStars); // Crea una stringa con il numero corretto di stelle vuote
      return fullStars + emptyStars; // Stampa le stelle a schermo
    }
    
    
    return (
      <tr>            
        <td>{e.id }</td>
        <td style={{ color: isChecked ? 'red' : 'black' } }>{e.title}</td>
        <td>{e.favorites ?  /*<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" defaultChecked></input> : 
         <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" ></input>}*/
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          defaultChecked={isChecked} // aggiunto defaultChecked
          style={{marginRight: '5px'}}
        /> : 
        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"  onChange={cambiocolore}  style={{marginRight: '5px'}}></input>}
         <label className="form-check-label">
                        Favorites
                      </label></td>
        <td>{e.date ? e.date.format('YYYY-MM-DD') : ''}</td>  
        <td> {e.rating !== undefined ?  Stelle(e.rating)  : Stelle(0)} </td>
      </tr>
    );
  }


function MyTable(props) {
 
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);

    const [list, setList] = useState(props.listofFilm);
    const [showForm, setShowForm] = useState(false);
    const giorniIndietro = 30;

    /*const filtroIntervalloTempo = (e) => {
    const giorniIndietro = 30;
    const oggi = dayjs(); // Definisci la data di oggi
    const dataInizio = oggi.subtract(giorniIndietro, 'day'); // Calcola la data di inizio dell'intervallo di tempo
    console.log (giorniIndietro + "--"+ oggi+ "--"+dataInizio+"");
    return e.data.isBetween(dataInizio, oggi); // Restituisci true se la data si trova all'interno dell'intervallo di tempo, altrimenti false
    };*/
    

    const filterData = (list, filter) => {
    const today = dayjs(); // Ottiene la data di oggi

      switch (filter) {
        case "All":
          return list;
        case "Favorites":
          return list.filter((e) => e.favorites);
        case "Best Rated":
          return list.filter((e) => e.rating && e.rating == 5);
        case "Unseen" :
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
  

      const addToList = (e) => {
        setList((oldList) => [...oldList,e]);
        setShowForm(false);
      }
      
      const formvisibile  = () =>{
        setShowForm(true);
      }

      


    return (
        <>
        <Table >
        {/* <Table striped bordered hover> */}
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Favorite</th>
            <th>WatchDate</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((e) =>
            <MyRow e={e} key={e.id} />)
          }
        </tbody>
      </Table>
      <div>
      { showForm ?
    <MyButton  addToList={addToList} closeForm= {() => setShowForm(false)} >  </MyButton>
       : <Button onClick={()=> setShowForm(true)}> Add </Button>}
       </div>
    </>
    )
  }
  


function MainComponent(props) {
    return (<>
        <Row>
        <MyTable listofFilm={filmlist} filtro={props.filtro}  />
        </Row>     
      </>
      );
  }
  
export default MainComponent;



