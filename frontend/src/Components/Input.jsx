import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Styles/Input.module.css'
function Input(props) {
    return (
        <div>
            <Form>
                <div>
                    <FormControl type='text' placeholder='Search for jobs!'/>
                    <Button variant='primary'/>
                </div>
            </Form>
        </div>
    );
}

export default Input;