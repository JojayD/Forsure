import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import styles from '../Styles/JobCard.module.css'
function JobCard(props) {
  const { jobData } = props;

  const renderJobCards = () => {
    return jobData.map((job) => (
      <Card style={{ width: '24rem' }} key={job.link}>
        <Card.Body>
          <Card.Title>{job.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {job.company}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {job.location}
          </Card.Subtitle>
          <Card.Link href={job.link} target="_blank">
            View
          </Card.Link>
        </Card.Body>
      </Card>
    ));
  };

  return <div className={styles['job-grid-container']}>{renderJobCards()}</div>;
}

export default JobCard;
