import React, { useEffect, useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  Spinner
}                                     from 'react-bootstrap';
import JobCards                       from './JobCards.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles                         from '../Styles/Input.module.css';
import {
  city_names
}                                     from '../data/cities.js';

function Input (props) {
  const {
    colorMode,
    jobData,
    setJobData,
    savedJobData,
    setSavedJobData
  } = props;
  const [job, setJob] = useState('');
  const [location, setLocation] = useState('');
  const [suggestion, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // Default job and location values
    const defaultJob = 'Software Engineer';
    const defaultLocation = 'San Francisco';

    fetchDefaultJob(defaultJob, defaultLocation).then(r => console.log(r));
  }, []); // Empty dependency array to run only on mount

  async function fetchDefaultJob (job, location) {
    const url = new URL('http://localhost:5001/api/search');
    url.searchParams.append('job_title', job.trim());
    url.searchParams.append('location', location.trim());
    console.log('Sending request to:', url);
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        mode: 'cors'
      });
      const [arr1, arr2] = await response.json();
      const combinedArray = [...arr1, ...arr2];
      setJobData(combinedArray),
        console.log('Response data:', combinedArray);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error('Error occurred while fetching data: Response not valid JSON');
      } else {
        console.error('Error occurred while fetching data:', error);
      }
    }
    setIsLoading(false);
    setJob('');
    setLocation('');
  }

  function handleInput (event) {
    const input = event.target.value.toLowerCase();
    const makeSuggestions = city_names.filter(city =>
      city.toLowerCase().startsWith(input));
    setSuggestions(makeSuggestions);
    setLocation(input);
  }

  async function handleSubmit (event) {
    event.preventDefault();
    const url = new URL('http://localhost:5001/api/search');
    url.searchParams.append('job_title', job.trim());
    url.searchParams.append('location', location.trim());
    console.log('Sending request to:', url);
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        mode: 'cors'
      });
      const [arr1, arr2] = await response.json();
      const combinedArray = [...arr1, ...arr2];
      setJobData(combinedArray),
        console.log('Response data:', combinedArray);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error('Error occurred while fetching data: Response not valid JSON');
      } else {
        console.error('Error occurred while fetching data:', error);
      }
    }
    setIsLoading(false);
    setJob('');
    setLocation('');
  }

  function renderDropDown () {
    if (location && suggestion.length > 0) {
      return (
        <DropdownButton id="dropdown-basic-button"
                        title="Select Location"
                        onSelect={(location) => setLocation(location)}>
          <Dropdown.Menu style={{
            maxHeight: '200px',
            overflowY: 'auto'
          }}>

            {suggestion.map((city, index) => {
              return (
                <Dropdown.Item key={index}
                               eventKey={city}>{city}</Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </DropdownButton>);
    }
    return null;
  }

  return (
    <div>
      <Form onSubmit={e => handleSubmit(e)}>
        <div className={styles['parent-form__container']}>
          <div className={styles.form__container}>
            <div className={styles['form-width']}>
              <FormControl type="text"
                           placeholder="Search for jobs!"
                           value={job}
                           onChange={(e) => {setJob(e.target.value);}}/>
            </div>
            <div className={styles['form-width']}>
              <FormControl
                type="text"
                placeholder="Location"
                value={location}
                onChange={handleInput}
              />
              {renderDropDown()}
            </div>
          </div>
          <div className={styles.button__container}>
            <Button type="submit" variant="primary">Submit</Button>
          </div>
        </div>
      </Form>
      {isLoading ?
        (
          <div className={styles.spinner}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading data...</span>
            </Spinner>
          </div>

        ) :
        (

          <div className={styles['container__split']}>
            <div className={styles['container__split--left']}>
              {selectedCard ? (
                <>
                  <h2>{selectedCard.title}</h2>
                  <h2>{selectedCard.company}</h2>
                  <h3>{selectedCard.location}</h3>
                  <h4>{selectedCard.salary}</h4>
                  <h4>{selectedCard.time}</h4>
                  <a href={selectedCard.link} target={`_blank`}>View</a>
                </>) : (
                <div></div>)
              }
            </div>


            <div className={styles['container__split--right']}>
              <JobCards jobData={jobData} colorMode={colorMode}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}/>
            </div>
          </div>)}

    </div>);
}

export default Input;