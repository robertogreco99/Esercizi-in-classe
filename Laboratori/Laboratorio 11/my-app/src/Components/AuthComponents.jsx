import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';

function LoginForm(props) {
    const [username, setUsername] = useState('harry@test.com');
    const [password, setPassword] = useState('pwd');

    const doLogIn = (credentials) => {
        API.logIn(credentials)
          .then( user => {
            setErrorMessage('');
            props.loginSuccessful(user);
          })
          .catch(err => {
            // NB: Generic error message, should not give additional info (e.g., if user exists etc.)
            setErrorMessage('Wrong username or password');
          })
      }
    }