import React, {useState, useEffect} from 'react';
import {
    Button, Card,
    Spinner,
    Dropdown,
    DropdownButton,
    Form,
    FormControl
} from 'react-bootstrap';
import JobCard from "./JobCard.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Styles/Input.module.css'
import {city_names} from '../data/cities.js'

function Input(props) {
    const {colorMode, jobData , setJobData} = props;
    const [job, setJob] = useState('')
    const [location, setLocation] = useState('');
    const [suggestion, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

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
      setIsLoading(true);
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
      setIsLoading(false)
      setJob("");
      setLocation("");
    }

    function renderDropDown(){
        if(location && suggestion.length > 0){
            return(
                <DropdownButton id="dropdown-basic-button"
                                title="Select Location"
                                onSelect={(location) => setLocation(location)}>
                    {suggestion.map((city, index) => {
                        return (
                            <Dropdown.Item key={index}
                                           eventKey={city}>{city}</Dropdown.Item>
                        );
                    })}
                </DropdownButton>)
        }
        return null
    }

    return (
        <div>
            <Form onSubmit={e=>handleSubmit(e)}>
                <div className={styles['parent-form__container']}>
                    <div className={styles.form__container}>
                        <div className={styles['form-width']}>
                            <FormControl type='text'
                                         placeholder='Search for jobs!'
                                         value={job}
                                         onChange={(e) => {setJob(e.target.value)}}/>
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
                        <Button type= 'submit' variant='primary'>Submit</Button>
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
                (<div>
                    <JobCard jobData ={jobData} colorMode={colorMode}/>
                </div>)}

        </div>);
}

export default Input;