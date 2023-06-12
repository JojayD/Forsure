import { Button, Card } from 'react-bootstrap'
import React, { useContext, useState }  from 'react'
import { AuthContext }                       from '../Context/AuthContext.jsx'
import { Link } from 'react-router-dom'
import styles from '../Styles/SavedJobs.module.css'
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
    <div>
      <Link to={`/`}>
        <Button size={`sm`}>Back</Button>
      </Link>
      <div className={styles['styles__saved-jobs']}>{renderSavedJobCards()}</div>
    </div>
  )
}

export default SavedJobs;

