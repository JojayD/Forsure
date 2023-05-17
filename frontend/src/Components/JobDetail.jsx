// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Card } from 'react-bootstrap';
//
// function JobDetail({match, jobData}) {
//
//   const { jobId } = useParams();
//
//   if (!jobData || !jobData[match.params.id]) {
//     return <p>Loading...</p>; // Or any loading state you want
//   }
//
//   const job = jobData[match.params.id];
//   return (
//     <Card
//       style={{
//         width: '24rem',
//         backgroundColor: colorMode ? 'black' : 'white',
//         color: colorMode ? 'white' : 'black'
//       }}
//     >
//       <Card.Body>
//         <Card.Title>{job.title}</Card.Title>
//         <Card.Subtitle className="mb-2">{job.company}</Card.Subtitle>
//         <Card.Subtitle className="mb-2">{job.location}</Card.Subtitle>
//         <Card.Text>
//           {/* Replace this with the detailed job information you want to display. */}
//           Detailed job information goes here.
//         </Card.Text>
//         <Card.Link href={job.link} target="_blank">View</Card.Link>
//       </Card.Body>
//     </Card>
//   );
// }
//
// export default JobDetail;
