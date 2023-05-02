import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";

function Card(props) {
    const {items } = props
    return (
        <Card style = {{width : '18rem'}}>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.location}</Card.Subtitle>
            <Card.Text>{props.link}</Card.Text>
        </Card>
    );
}

export default Card;