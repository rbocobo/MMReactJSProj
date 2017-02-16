import React from 'react';
import {ListGroup} from 'react-bootstrap';
import Card from './card';

export default class CardList extends React.Component{
    render(){
        return(
            <div className="container">
                <ListGroup bsClass="list-group-horizontal">
                    {
                        this.props.data.map((item)=>{
                        return(<Card key={item.title} title={item.title} content={item.content}/>);
                        })
                    }
                </ListGroup>
            </div>
        );
    }
}
