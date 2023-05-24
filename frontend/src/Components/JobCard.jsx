import React, { useState, useContext } from 'react'
import { AuthContext }                 from '../../Context/AuthContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card }          from 'react-bootstrap'
import { Link }                  from 'react-router-dom'
import styles                    from '../Styles/JobCard.module.css'
import { getDatabase, ref, set } from 'firebase/database'

function JobCard (props) {
  const [disabled, setDisabled] = useState(false)
  const { jobData, colorMode } = props
  const authContext = useContext(AuthContext);
  if (!jobData) {
    return null
  }

  function saveJob (event, index, name, email) {
    let job = jobData[index]
    const jobDataToSave = {
      'title': job.title,
      'company': job.company,
      'location': job.location,
      // Add any additional data you want to save
    }

    writeUserData()
    console.log(`${index} clicked`)

    function writeUserData (userId, name, email) {
      const db = getDatabase()
      set(ref(db, `users/${name}` ), jobDataToSave)
    }
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
              <Link to={`/job/${index}`} className={styles.jobLink}>
                <Card.Link href={job.link} target="_blank"
                           onClick={handleViewClick}>
                  View
                </Card.Link>
              </Link>
              <Button onClick={(event) => saveJob(event, index)}>Save</Button>

            </div>
          </Card.Body>
        </Card>
      </div>
    ))
  }

  return <div className={styles['job-grid-container']}>{renderJobCards()}</div>
}

export default JobCard
