import { Card } from 'react-bootstrap'
import styles   from '../Styles/JobCard.module.css'
import React    from 'react'

//Use firebase to show the saved jobs and render them

function SavedJobs (props) {
  function handleViewClick (event) {
    event.stopPropagation()
  }


  const renderSavedJobCards = () => {
    return props.savedJobData.map((job, index) => (

      <div key={job.link}>
        <Card
          style={{
            width: '24rem',
            backgroundColor: colorMode ? 'black' : 'white',
            color: colorMode ? 'white' : 'black',
          }}
          className={colorMode ? styles.customDarkMode : styles.customLightMode}
        >
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
            </div>
          </Card.Body>
        </Card>
      </div>
    ))
  }

  return (
    <div></div>
  )
}

export default SavedJobs;

