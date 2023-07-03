import React, { useContext } from 'react'
import styles                           from '../Styles/Header.module.css'
import { library }                      from '@fortawesome/fontawesome-svg-core'
import { faMoon, fas, faSun }           from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome'
import Button                           from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContext }                  from '../Context/AuthContext.jsx'
import { child, get, getDatabase, ref } from 'firebase/database'
import {
  app
}                                       from '/Users/jojo/flask-vite-react/frontend/firebase/firebase.mjs'
import { Link }                         from 'react-router-dom'

library.add(fas, faSun, faMoon)

function Header (props) {
  const { colorMode, handleToggle } = props;
  const authContext = useContext(AuthContext);

  function handleLogoutEvent(){
    authContext.logout()
    alert(`Logging out ${authContext.email}`)
    props.setIsAuthenticated(false);

  }

  function handleSaveEvent (event) {
    console.log('Clicked!')
    const dbRef = ref(getDatabase(app));

    get(child(dbRef, `users/${authContext.email.substring(0, authContext.email.indexOf('@'))}/userSavedJobs`)).then((snapShot) => {
      props.setSavedJobData([])
      if (snapShot.exists()) {
        snapShot.forEach((childSnapshot) => {
          console.log(childSnapshot.key, '\n', childSnapshot.val())
          props.setSavedJobData(prev => [...prev, childSnapshot.val()])

        })

      } else {
        console.log('No data available')
      }
    }).catch((error) => {
      console.error(error)
    })
    console.log(props.savedJobData)
  }

  return (
    <header className={styles.container}>
      <div className={styles.header_title}>ForSure</div>
      <div className={styles.action__buttons}>
        <Link to={'/saved'}>
          <Button variant={`primary`} size={`sm`}
                 onClick={handleSaveEvent}>Saved</Button>
        </Link>
        <Button variant={`primary`} size={`sm`} onClick={handleLogoutEvent}>Logout</Button>
        <FontAwesomeIcon icon={colorMode ? ['fas', 'sun'] : ['fas', 'moon']}
                         onClick={handleToggle}
        />
      </div>
    </header>
  )
}

export default Header
