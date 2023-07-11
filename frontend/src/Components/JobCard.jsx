import React, { useContext, useEffect, useState } from 'react';
import { Button, Card }                           from 'react-bootstrap';
import styles
                                                  from '../Styles/JobCard.module.css';
import { Link }                                   from 'react-router-dom';
import { getDatabase, off, onValue, ref }         from 'firebase/database';
import {
  app
}                                                 from '/Users/jojo/flask-vite-react/frontend/firebase/firebase.mjs';
import {
  AuthContext
}                                                 from '../Context/AuthContext.jsx';

function JobCard (props) {
  const authContext = useContext(AuthContext);
  const [jobSavedCard, setJobSavedCard] = useState(false);
  useEffect(() => {
    const db = getDatabase(app);
    const dataRef = ref(db, `users/${authContext.email.substring(0, authContext.email.indexOf('@'))}/userSavedJobs/`);

    const handleDataChange = (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const newChildDataTitle = childSnapshot.val().title;
        const newChildDataLocation = childSnapshot.val().location;
        console.log('New data added', newChildDataTitle, ':', props.job);

        if (newChildDataTitle == props.job.title && newChildDataLocation == props.job.location) {
          setJobSavedCard(prevState => !prevState);
        }
      });
    };

    onValue(dataRef, handleDataChange);

    return () => {
      off(dataRef, 'value', handleDataChange);
    };
  }, []);

  return (
    <div key={props.job.link}>
      <Card
        style={{
          width: '24rem',
          backgroundColor: props.colorMode ? 'black' : 'white',
          color: props.colorMode ? 'white' : 'black',
        }}
        className={styles['card-container']}
      >
        <Link to={`/job/${props.index}`} className={styles.jobLink}>
          <Card.Body>
            <div>
              <img src={props.job.image}/>
            </div>
            <Card.Title>{props.job.title}</Card.Title>
            <Card.Subtitle className="mb-2"
                           style={{ color: props.colorMode ? 'white' : 'black' }}>
              {props.job.company}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2"
                           style={{ color: props.colorMode ? 'white' : 'black' }}>
              {props.job.location}
            </Card.Subtitle>
            <Card.Subtitle>
              {props.job.salary}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2"
                           style={{ color: props.colorMode ? 'white' : 'black' }}>
              {props.job.time}
            </Card.Subtitle>
            <div className={styles['container-button']}>
              <Card.Link href={props.job.link} target="_blank"
                         onClick={props.handleViewClick}>
                View
              </Card.Link>
              <Button onClick={(event) => props.saveJob(event, props.index)}
                      disabled={jobSavedCard}>
                {jobSavedCard ? 'Saved' : 'Save'}
              </Button>

            </div>
          </Card.Body>
        </Link>
      </Card>
    </div>
  );
}

export default JobCard;