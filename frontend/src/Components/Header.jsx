import React                  from 'react'
import styles                 from '../Styles/Header.module.css'
import { library }            from '@fortawesome/fontawesome-svg-core'
import { faMoon, fas, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon }    from '@fortawesome/react-fontawesome'
import  Button              from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AuthContext} from '/Users/jojo/flask-vite-react/frontend/src/Context/AuthContext.jsx'
library.add(fas, faSun, faMoon)

function Header (props) {
  const { colorMode, handleToggle } = props;
  function handleEvent(event){
    console.log('Clicked!')

  }
  return (
    <header className={styles.container}>
      <div className={styles.header_title}>ForSure</div>
      <div className={styles.action__buttons}>
        <Button variant={`primary`} size={`sm`} onClick={handleEvent}>Saved</Button>
        <Button variant={`primary`} size={`sm`}>Logout</Button>
        <FontAwesomeIcon icon={colorMode ? ['fas', 'sun'] : ['fas', 'moon']}
                         onClick={handleToggle}
        />
      </div>
    </header>
  )
}

console.log(library)
export default Header;
