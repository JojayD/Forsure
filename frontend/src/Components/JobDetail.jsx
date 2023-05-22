import React             from 'react';
import {Link, useParams} from 'react-router-dom';
import { Card }          from 'react-bootstrap';

function JobDetail({colorMode, jobData}) {

  const { jobId } = useParams();

  if (!jobData || !jobData[jobId]) {
    return
  }

  const job = jobData[jobId]

  console.log(jobData)
  return (
      <div>

        <Card
          style={{
            width: '24rem',
            backgroundColor: colorMode ? 'black' : 'white',
            color: colorMode ? 'white' : 'black'
          }}
        >

          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2">{job.company}</Card.Subtitle>
            <Card.Subtitle className="mb-2">{job.location}</Card.Subtitle>
            <Card.Text>
              {/* Replace this with the detailed job information you want to display. */}
              Detailed job information goes here.
            </Card.Text>
            <Card.Link href={job.link} target="_blank">View</Card.Link>
          </Card.Body>
        </Card>


      </div>

  );
}

export default JobDetail;
