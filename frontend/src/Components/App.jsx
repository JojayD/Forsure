import React, { useState, useEffect } from 'react'
import '../Styles/App.css'
import '../Styles/index.css'
import LoginPage from "./LoginPage.jsx";
import Header    from "./Header.jsx";
import Input from "./Input.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobDetail                                  from "./JobDetail.jsx";

function App() {
    const [colorMode, setColorMode] = useState(false);
    const[isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        document.body.style.backgroundColor = colorMode ? '#27272a' : 'white';
        document.body.style.color = colorMode ? 'white' : 'black';
    },[colorMode])

    function handleToggle(){
        setColorMode(prevState => !prevState)
    }
    return(

          <div className='app__container'>
              {isAuthenticated ?
                  (<>
                      <Header colorMode = {colorMode} setColorMode={setColorMode} handleToggle = {handleToggle}/>
                      <Input colorMode = {colorMode} />
                      <Routes>
                          <Route path="/" element={<Input colorMode={colorMode} setColorMode={setColorMode} handleToggle={handleToggle}/>}/>
                          <Route path="/job/:jobId" element={<JobDetail colorMode={colorMode} setColorMode={setColorMode} handleToggle={handleToggle}/>}/>
                      </Routes>
                  </>) :
                  (<LoginPage setIsAuthenticated = {setIsAuthenticated}/>)}

          </div>
    )

}

export default App;
