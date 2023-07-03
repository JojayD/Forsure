import { Button, Card }                      from 'react-bootstrap'
import React, { useContext, useEffect }      from 'react'
import { AuthContext }                       from '../Context/AuthContext.jsx'
import { Link }                              from 'react-router-dom'
import styles
                                                    from '../Styles/SavedJobs.module.css'
import { child, getDatabase, onValue, ref, remove } from 'firebase/database'
import {
  app
}                                                   from '/Users/jojo/flask-vite-react/frontend/firebase/firebase.mjs'

function SavedJobs (props) {

  const authContext = useContext(AuthContext)
  useEffect(() => {
    const db = getDatabase(app)
    const dataRef = ref(db, `users/${authContext.email.substring(0, authContext.email.indexOf('@'))}/userSavedJobs/`)

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const newData = snapshot.val()
      if (newData !== undefined) {
        const newDataArray = Object.values(newData)
        props.setSavedJobData(newDataArray);
      }
    })
    // const unsubscribe = onValue(dataRef, )

    return () => {
      unsubscribe()
    }

  }, [])

  function handleViewClick (event) {
    event.stopPropagation()
  }

  function deleteSavedJob (id) {
    console.log(`Deleting ${id}`)
    const db = getDatabase(app)
    const dataRef = ref(db, `users/${authContext.email.substring(0, authContext.email.indexOf('@'))}/userSavedJobs/job_${id}`)
    remove(dataRef)
    .then(() => {
      console.log('Data deleted successfully')
      // Re-fetch saved jobs data from Firebase

    })
    .catch((error) => {
      console.error('Error deleting data:', error)
    })
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
          className={styles['saved-job-card']}
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
            <div className={styles['container-buttons']}>
              <Card.Link href={job.link} target="_blank"
                         onClick={handleViewClick}>
                View

              </Card.Link>
              <Button onClick={() => deleteSavedJob(job.id)}>Delete</Button>
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
      <div
        className={styles['styles__saved-jobs']}>{renderSavedJobCards()}
      </div>
    </div>
  )
}

export default SavedJobs

