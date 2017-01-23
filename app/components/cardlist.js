import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Card from './card';

export default class CardList extends React.Component{
    render(){
        return(
            <div className="container">
                <ListGroup bsClass="list-group-horizontal">
                    <Card/>
                    <Card/>
                    <Card/>
                </ListGroup>
            </div>
        );
    }
}
