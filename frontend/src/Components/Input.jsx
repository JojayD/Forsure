import React, {useState} from 'react';
import {
    Button,
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
    const [location, setLocation] = useState('')
    const [suggestion, setSuggestions] = useState([])

    function handleInput(event) {
        const input = event.target.value.toLowerCase();
        const makeSuggestions = city_names.filter(city =>
            city.toLowerCase().startsWith(input))
        setSuggestions(makeSuggestions)
        setLocation(input)
    }


    return (
        <div>
            <Form>
                <div>
                    <div className={styles.form__container}>
                        <div className={styles['form-width']}>
                            <FormControl type='text'
                                         placeholder='Search for jobs!'
                                         value={job}
                                         onChange={(e) => setJob(e.target.value)}/>
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
                                    {suggestion.map((city, index) => (
                                        <Dropdown.Item key={index}
                                                       eventKey={city}>{city}</Dropdown.Item>
                                    ))}
                                </DropdownButton>

                            )}

                        </div>

                    </div>
                    <div className={styles.button__container}>
                        <Button variant='primary'>Submit</Button>
                    </div>
                </div>
            </Form>
        </div>);
}

export default Input;