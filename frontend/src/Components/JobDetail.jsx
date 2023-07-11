import React               from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Card }    from 'react-bootstrap'
import styles from '../Styles/JobDetail.module.css'
function JobDetail ({ colorMode, jobData }) {

  const { jobId } = useParams()

  if (!jobData || !jobData[jobId]) {
    return
  }

  const job = jobData[jobId]

  console.log(jobData)
  return (
    <div>
      <Link to={`/`}>
        <Button size={`sm`}>Back</Button>
      </Link>
      <div className={styles.container}>
        <title>{job.title}</title>
        <h2>{job.company}</h2>
        <h3>{job.location}</h3>
        <h4>{job.salary}</h4>
        <h4>{job.time}</h4>
        <a href={job.link} target={`_blank`}>View</a>
      </div>

    </div>

  )
}

export default JobDetail;
