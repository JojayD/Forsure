import React, { useContext, useState } from 'react'
import styles                          from '../Styles/LoginPage.module.css'
import { Button, Form, FormControl }   from 'react-bootstrap'
import { AuthContext }                 from '../../Context/AuthContext.jsx'
import { getDatabase, ref, set, get, child }       from 'firebase/database'
import {
  app
}                                      from '/Users/jojo/flask-vite-react/frontend/firebase/firebase.mjs'

function LoginPage (props) {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  function handleSubmit (event) {
    event.preventDefault()
    if (!validateEmail(email)) {
      alert('Invalid email: ' + email)
      setEmail('')
      setPassword('')
      console.log(email)
      return
    }
    writeUserData(userIdGenerator(), email, password)
    props.setIsAuthenticated(true)
  }

  function writeUserData (userId, email, password) {
    const db = getDatabase(app)
    set(ref(db, 'users/' + userId), {
      'email': email,
      'password': password,
      'userSavedJobs': []
    })
  }

  function readData () {
    const dbRef = ref(getDatabase(app))
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
      } else {
        console.log('No data available')
      }
    }).catch((error) => {
      console.error(error)
    })
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
  )
}

export default LoginPage
