import { useState } from 'react'
import '../Styles/App.css'
import '../Styles/index.css'
import Header from "./Header.jsx";
import Input from "./Input.jsx";
function App() {
  return(
      <div className='app__container'>
          <Header/>
          <Input/>
      </div>
  )

}

export default App;
