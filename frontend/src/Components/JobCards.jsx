import React, { useContext, useEffect, useState } from 'react'
import {
  AuthContext
}                                                 from '../Context/AuthContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles
                                                  from '../Styles/JobCard.module.css'
import { child, get, getDatabase, ref, set }      from 'firebase/database'
import {
  app
}              from '/Users/jojo/flask-vite-react/frontend/firebase/firebase.mjs'
import JobCard from './JobCard.jsx'
function JobCards (props) {
  const [jobSaved, setJobSaved] = useState(false)
  const { jobData, colorMode } = props
  const authContext = useContext(AuthContext)
  console.log('Email: ', authContext.email)
  console.log('Password: ', authContext.password)
  if (!jobData) {
    return null
  }

  useEffect(() => {
    const db = ref(getDatabase(app))

    get(child(db, `users/${authContext.email.substring(0, authContext.email.indexOf('@'))}/userSavedJobs`)).then((snapShot) => {
      if (snapShot.exists()) {
        snapShot.forEach((childSnapshot) => {
          const comp = props.jobData.find((job) => job.company == childSnapshot.val().company)
          const location = props.jobData.find((job) => job.location == childSnapshot.val().location)
        })

      } else {
        console.log('No data available')
      }
    }).catch((error) => {
      console.error(error)
    })
  }, [])

  function saveJob (event, index) {
    event.preventDefault();
    const generatedId = userIdGenerator()
    let job = jobData[index]
    const jobDataToSave = {
      'title': job.title,
      'company': job.company,
      'location': job.location,
      'link': job.link,
      'id': generatedId,
      'saved': !job.saved
    }

    function writeUserData (email) {
      console.log('email: ', email)
      console.log(jobDataToSave)
      const db = getDatabase(app)

      set(ref(db, `users/${email.substring(0, email.indexOf('@'))}/userSavedJobs/job_${generatedId}`), jobDataToSave).then(() => {
        alert(`${job.title} has been saved!`)
      })
      .catch((error) => {
        console.error('Error in saving data:', error)
      })
      const userSavedRef = ref(db, `users/${email.substring(0, email.indexOf('@'))}/userSavedJobs/`)
    }

    writeUserData(authContext.email)

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
      <JobCard job = {job}
               index = {index}
               handleViewClick = {handleViewClick}
               saveJob={saveJob}
               colorMode ={colorMode}
      />
    ))
  }

  return <div className={styles['job-grid-container']}>{renderJobCards()}</div>
}

export default JobCards
