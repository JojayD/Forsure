import React from 'react';
import styles from '../Styles/Header.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas, faSun);

function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.header_title}>Forsure</div>
      <FontAwesomeIcon icon={['fas', 'sun']} />
    </header>
  );
}

    console.log(library)
export default Header;
