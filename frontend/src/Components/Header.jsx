import React from 'react';
import styles from '../Styles/Header.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faMoon, fas, faSun} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas, faSun, faMoon);

function Header() {
    const [mode, setMode] = React.useState(false)
    function handleToggle(){
        setMode(prevState => !prevState)
        document.body.style.backgroundColor = mode ? "white" : "black";
    }
  return (
    <header className={styles.container}>
      <div className={styles.header_title}>Forsure</div>
      <FontAwesomeIcon icon={ mode ? ['fas', 'sun'] : ["fas", "moon"]}
        onClick={handleToggle}
      />
    </header>
  );
}

    console.log(library)
export default Header;
