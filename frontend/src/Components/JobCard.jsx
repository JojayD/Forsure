import React, { useContext, useState } from 'react'
import { AuthContext }                 from '../Context/AuthContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card }                from 'react-bootstrap'
import { Link }                        from 'react-router-dom'
import styles                          from '../Styles/JobCard.module.css'
import { getDatabase, ref, set }       from 'firebase/database'
import {
  app
}                                      from '/Users/jojo/flask-vite-react/frontend/firebase/firebase.mjs'

function JobCard (props) {

  const { jobData, colorMode } = props
  const  authContext  = useContext(AuthContext);
  console.log('Email: ', authContext.email);
  console.log('Password: ', authContext.password);
  if (!jobData) {
    return null;
  }

  function saveJob (event, index) {

    let job = jobData[index]
    const jobDataToSave = {
      'title': job.title,
      'company': job.company,
      'location': job.location,
      'link': job.link
    }

    function writeUserData (email) {
      console.log('email: ', email)
      console.log(jobDataToSave)
      const db = getDatabase(app)
      set(ref(db, `users/${email.substring(0, email.indexOf('@'))}/userSavedJobs/job_${userIdGenerator()}`), jobDataToSave)

    }

    writeUserData(authContext.email)
    alert(`${job.title} has been saved!`)
    console.log(`${index} clicked`)


  }

  function handleViewClick (event) {
    event.stopPropagation()
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

  const renderJobCards = () => {
    console.log('Rendering cards!')
    return jobData.map((job, index) => (

      <div key={job.link}>
        <Card
          style={{
            width: '24rem',
            backgroundColor: colorMode ? 'black' : 'white',
            color: colorMode ? 'white' : 'black',
          }}
          className={colorMode ? styles.customDarkMode : styles.customLightMode}
        >
          <Link to={`/job/${index}`} className={styles.jobLink}>
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2"
                           style={{ color: colorMode ? 'white' : 'black' }}>
              {job.company}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2"
                           style={{ color: colorMode ? 'white' : 'black' }}>
              {job.location}
            </Card.Subtitle>
            <div className={styles['container-button']}>
                <Card.Link href={job.link} target="_blank"
                           onClick={handleViewClick}>
                  View
                </Card.Link>
              <Button onClick={(event) => saveJob(event, index)}>Save</Button>

            </div>
          </Card.Body>
          </Link>
        </Card>
      </div>
    ))
  }

  return <div className={styles['job-grid-container']}>{renderJobCards()}</div>
}

export default JobCard;
