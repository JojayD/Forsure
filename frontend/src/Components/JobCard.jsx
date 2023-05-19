import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../Styles/JobCard.module.css';
import {useState} from "react";
function JobCard(props) {
  const { jobData, colorMode } = props;

  if (!jobData) {
    return null;
  }



  function handleClickView(event){
      event.stopPropagation()
  }

  function userIdGenerator(){

  }

  const renderJobCards = () => {
    return jobData.map((job, index) => (
      <Link to={`/job/${index}`} key={job.link} className={styles.jobLink}>
        <Card
          style={{
            width: '24rem',
            backgroundColor: colorMode ? 'black' : 'white',
            color: colorMode ? 'white' : 'black',
          }}
          key={job.link}
          className={colorMode ? styles.customDarkMode : styles.customLightMode}
          id={}
        >
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2" style={{ color: colorMode ? 'white' : 'black' }}>
              {job.company}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2" style={{ color: colorMode ? 'white' : 'black' }}>
              {job.location}
            </Card.Subtitle>
            <Card.Link href={job.link} target="_blank" onClick={handleViewClick}>View</Card.Link>
          </Card.Body>
        </Card>
      </Link>
    ));
  };

  return <div className={styles['job-grid-container']}>{renderJobCards()}</div>;
}

export default JobCard;
