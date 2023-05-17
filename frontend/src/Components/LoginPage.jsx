import React from 'react';
import { useState } from 'react';
import styles from '../Styles/LoginPage.module.css';
import { Button, Card, Dropdown, DropdownButton, Form, FormControl } from 'react-bootstrap';

function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateEmail(email)) {
      alert('Invalid email: ' + email);
      console.log(email)
    }
    props.setIsAuthenticated(true);
  }

  function validateEmail(email) {
    return !!email.includes('@');
  }

  function handleInput(event, setFunc) {
    const input = event.target.value;
    setFunc(input);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles['container-parent']}>
        <div className={styles['title-login']}>
          <h1 className={styles.title}>Sign into your account</h1>
        </div>
        <div className={styles.container__input}>
          <div className={styles['form-width']}>
            <FormControl
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInput(e, setEmail)}
            />
          </div>
          <div className={styles['form-width']}>
            <FormControl
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleInput(e, setPassword)}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}

export default LoginPage;
