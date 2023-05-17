import React from 'react';
import styles from '../Styles/Header.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faMoon, fas, faSun} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas, faSun, faMoon);

function Header(props) {
    const {colorMode,  handleToggle} = props
    return (
        <header className={styles.container}>
          <div className={styles.header_title}>ForSure</div>
          <FontAwesomeIcon icon={ colorMode ? ['fas', 'sun'] : ["fas", "moon"]}
            onClick={handleToggle}
          />
        </header>
    );
}

    console.log(library)
export default Header;
