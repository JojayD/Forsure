import { Card }                  from 'react-bootstrap'
import styles                           from '../Styles/JobCard.module.css'
import React, { useContext, useState }  from 'react'
import { child, get, getDatabase, ref } from 'firebase/database'
import { app }                          from '../../firebase/firebase.mjs'
import { AuthContext }                       from '../Context/AuthContext.jsx'
//Use firebase to show the saved jobs and render them

function SavedJobs (props) {
  const authContext = useContext(AuthContext);
  function handleViewClick (event) {
    event.stopPropagation();
  }


  const renderSavedJobCards = () => {
    return props.savedJobData.map((job, index) => (
      <div key={job.link}>
        <Card
          style={{
            width: '24rem',
            backgroundColor: props.colorMode ? 'black' : 'white',
            color: props.colorMode ? 'white' : 'black',
          }}
          className={props.colorMode ? styles.customDarkMode : styles.customLightMode}
        >
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2"
                           style={{ color: props.colorMode ? 'white' : 'black' }}>
              {job.company}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2"
                           style={{ color: props.colorMode ? 'white' : 'black' }}>
              {job.location}
            </Card.Subtitle>
            <div className={styles['container-button']}>
              <Card.Link href={job.link} target="_blank"
                         onClick={handleViewClick}>
                View
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    ))
  }

  return (
    <div>{renderSavedJobCards()}</div>
  )
}

export default SavedJobs;

