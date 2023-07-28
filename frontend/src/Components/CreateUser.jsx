import React, { useContext, useState }       from 'react';
import { Button, Form, FormControl }         from 'react-bootstrap';
import styles
                                             from '../Styles/CreateUser.module.css';
import { AuthContext }                       from '../Context/AuthContext.jsx';
import { child, get, getDatabase, ref, set } from 'firebase/database';
import { app }                               from '../../firebase/firebase.mjs';

function CreateUser (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);

  function handleInput (event, setFunc) {
    const input = event.target.value;
    setFunc(input);
    console.log(input);
  }

  function validateEmail (email) {
    return !!email.includes('@');
  }

  async function readData () {
    const dbRef = ref(getDatabase(app));
    let check_password = '';
    let check_email = '';
    let userExist = false;
    try {
      const snapshot = await get(child(dbRef, `users/${email.substring(0, email.indexOf('@'))}`));
      if (snapshot.exists()) {
        alert('Email exsists');
        console.log(snapshot.val());
        check_password = snapshot.val().password;
        check_email = snapshot.val().email;
        console.log(check_password);
        userExist = true;
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error(error);
    }
    return { userExist, check_password, check_email };
  }

  async function handleSubmit (event) {
    event.preventDefault();

    if (!validateEmail(email)) {
      alert('Invalid email: ' + email);
      setEmail('');
      setPassword('');
      console.log(email);
      return;
    }

    const { userExist, check_password, check_email } = await readData();
    if (userExist) {
      if (password !== check_password) {
        alert('Wrong password');
      } else {
        props.setIsAuthenticated(true);
        //using this data for login
        authContext.login(check_email, check_password);
      }
    } else {
      props.setIsAuthenticated(true);
      writeUserData(email, password);
      authContext.login(check_email, check_password);
    }
  }

  function userIdGenerator () {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let i = 0;
    while (i < 4) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      i++;
    }
    return result;
  }

  function writeUserData (email, password) {
    const db = getDatabase(app);
    console.log(`Here is the password/email:${authContext.email}, ${authContext.password}`);
    console.log('Print from LoginPage.jsx');
    set(ref(db, `users/${email.substring(0, email.indexOf('@'))}`), {
      'email': email,
      'id': userIdGenerator(),
      'password': password,
      'userSavedJobs': {}
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.container}>

        <h2>Get started</h2>
        <div className={styles.container__inputs}>
          <FormControl
            type={`text`}
            placeholder={`Enter your email`}
            onChange={(e) => handleInput(e, setEmail)}
            value={email}
          />
          <FormControl
            type={`text`}
            placeholder={`Enter a password`}
            onChange={(e) => handleInput(e, setPassword)}
            value={password}
          />
          <Button size={`sm`}
                  className={styles['container__inputs-submit']}
                  type={`submit`}>Submit</Button>
        </div>
      </div>
    </Form>
  );
}

export default CreateUser;