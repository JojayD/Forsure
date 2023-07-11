import React, { useContext, useState }       from 'react'
import styles
                                             from '../Styles/LoginPage.module.css'
import { Button, Form, FormControl }         from 'react-bootstrap'
import { AuthContext }                       from '../Context/AuthContext.jsx'
import { child, get, getDatabase, ref, set } from 'firebase/database'
import {
  app
}                                            from '/Users/jojo/flask-vite-react/frontend/firebase/firebase.mjs'

function LoginPage (props) {
  const authContext = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit (event) {
    event.preventDefault()

    if (!validateEmail(email)) {
      alert('Invalid email: ' + email)
      setEmail('')
      setPassword('')
      console.log(email)
      return
    }

    const { userExist, check_password, check_email } = await readData();
    if (userExist) {
      if (password !== check_password) {
        alert('Wrong password')
      } else {
        props.setIsAuthenticated(true)
        //using this data for login
        authContext.login(check_email, check_password)
      }
    } else {
      props.setIsAuthenticated(true)
      writeUserData(email, password)
      authContext.login(check_email, check_password)
    }
  }

  function writeUserData (email, password) {
    const db = getDatabase(app)
    console.log(`Here is the password/email:${authContext.email}, ${authContext.password}`)
    console.log('Print from LoginPage.jsx')
    set(ref(db, `users/${email.substring(0, email.indexOf('@'))}`), {
      'email': email,
      'id': userIdGenerator(),
      'password': password,
      'userSavedJobs': {}
    })
  }

  //Function to check if a user has been made already
  async function readData () {
    const dbRef = ref(getDatabase(app))
    let check_password = '';
    let check_email = '';
    let userExist = false;
    try {
      const snapshot = await get(child(dbRef, `users/${email.substring(0, email.indexOf('@'))}`))
      if (snapshot.exists()) {
        alert('Email exsists')
        console.log(snapshot.val())
        check_password = snapshot.val().password
        check_email = snapshot.val().email
        console.log(check_password)
        userExist = true
      } else {
        console.log('No data available')
      }
    } catch (error) {
      console.error(error)
    }
    return { userExist, check_password, check_email }
  }

  function userIdGenerator () {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let i = 0
    while (i < 4) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
      i++
    }
    return result
  }

  function validateEmail (email) {
    return !!email.includes('@')
  }

  function handleInput (event, setFunc) {
    const input = event.target.value
    setFunc(input)
  }

  return (

    <Form onSubmit={handleSubmit} className={styles['form-container']}>
      <div className={styles['container-parent']}>
        <div>
          <h3>Forsure</h3>
        </div>
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
  )
}

export default LoginPage
