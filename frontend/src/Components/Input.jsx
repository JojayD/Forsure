import React, {useState} from 'react';
import {
    Button, Card,
    Dropdown,
    DropdownButton,
    Form,
    FormControl
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Styles/Input.module.css'
import {city_names} from '../data/cities.js'

function Input(props) {
    const [job, setJob] = useState('')
    const [location, setLocation] = useState('');
    const [suggestion, setSuggestions] = useState([]);
    const [jobData, setJobData] = useState([]);
    function handleInput(event) {
        const input = event.target.value.toLowerCase();
        const makeSuggestions = city_names.filter(city =>
            city.toLowerCase().startsWith(input))
        setSuggestions(makeSuggestions)
        setLocation(input)
    }
    async function handleSubmit(event) {
      event.preventDefault();
      const url = new URL("http://localhost:5001/api/search");
      url.searchParams.append("job_title", job.trim());
      url.searchParams.append("location", location.trim());
      console.log("Sending request to:", url);

      try {
        const response = await fetch(url, {
          mode: 'cors'
        });
        const [arr1, arr2] = await response.json();
        const combinedArray = [...arr1,...arr2];
        setJobData(combinedArray);
        console.log("Response data:", combinedArray);
      } catch (error) {
        if (error instanceof SyntaxError) {
          console.error("Error occurred while fetching data: Response not valid JSON");
        } else {
          console.error("Error occurred while fetching data:", error);
        }
      }




    }





    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div>
                    <div className={styles.form__container}>
                        <div className={styles['form-width']}>
                            <FormControl type='text'
                                         placeholder='Search for jobs!'
                                         value={job}
                                         onChange={(e) => {
                                             setJob(e.target.value)
                                             console.log(job)
                                         }}/>
                        </div>
                        <div className={styles['form-width']}>
                            <FormControl
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={handleInput}
                            />
                            {location && suggestion.length > 0 && (
                                <DropdownButton id="dropdown-basic-button"
                                                title="Select Location"
                                                onSelect={(location) => setLocation(location)}>
                                    {suggestion.map((city, index) => {
                                        return (
                                            <Dropdown.Item key={index}
                                                           eventKey={city}>{city}</Dropdown.Item>
                                        );
                                    })}
                                </DropdownButton>

                            )}

                        </div>

                    </div>
                    <div className={styles.button__container}>
                        <Button type= 'submit' variant='primary'>Submit</Button>
                    </div>
                </div>
            </Form>

            <div>
                <Card jobData ={jobData}/>
            </div>
        </div>);
}

export default Input;