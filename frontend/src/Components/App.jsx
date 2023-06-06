import React, { useEffect, useState } from 'react'
import '../Styles/App.css'
import '../Styles/index.css'
import LoginPage                      from './LoginPage.jsx'
import Header                         from './Header.jsx'
import Input                          from './Input.jsx'
import { Route, Routes }              from 'react-router-dom'
import JobDetail                      from './JobDetail.jsx'
import SavedJobs                      from './SavedJobs.jsx'

function App () {
  const [colorMode, setColorMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [jobData, setJobData] = useState([])  // new state variable
  const [savedJobData, setSavedJobData] = useState([])

  useEffect(() => {
    document.body.style.backgroundColor = colorMode ? '#27272a' : 'white'
    document.body.style.color = colorMode ? 'white' : 'black'
  }, [colorMode])

  function handleToggle () {
    setColorMode(prevState => !prevState)
  }

  return (

    <div className="app__container">
      {isAuthenticated ?
        (
          <>
            <Header colorMode={colorMode} setColorMode={setColorMode}
                    savedJobData={savedJobData}
                    setSavedJobData={setSavedJobData}
                    handleToggle={handleToggle}

            />
            <Routes>
              <Route
                path="/*"
                element={<Input colorMode={colorMode}
                                setColorMode={setColorMode}
                                handleToggle={handleToggle}
                                jobData={jobData}
                                setJobData={setJobData}
                  // savedJobData={savedJobData}
                  // setSavedJobData={setSavedJobData}
                />}
              />
              <Route
                path="/job/:jobId"
                element={<JobDetail colorMode={colorMode}
                                    setColorMode={setColorMode}
                                    handleToggle={handleToggle}
                                    jobData={jobData}/>}
              />
              <Route
                path="/saved"
                element={<SavedJobs savedJobData={savedJobData}
                                    setSavedJobData={setSavedJobData}
                                    colorMode={colorMode}
                                    setColorMode={setColorMode}
                />}
              />
            </Routes>
          </>) :
        (
          <LoginPage setIsAuthenticated={setIsAuthenticated}/>)}
    </div>

  )

}

export default App
