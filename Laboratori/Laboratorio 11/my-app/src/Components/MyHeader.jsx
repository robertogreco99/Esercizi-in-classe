import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs'

function MyHeader(props) {

    return (
      <header>
        
        <h1>Filtro: {props.filtro}</h1>
      </header>
    );
  }
  
export default MyHeader;

