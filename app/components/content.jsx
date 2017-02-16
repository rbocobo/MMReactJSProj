import React,  {Component} from 'react';
import {Grid, Col, Row, Panel} from 'react-bootstrap';
import Hero from './hero';
import Section from './section';
import CardList from './cardlist';

export default class Content extends Component{
    render(){
        let cardData = [
            {
                title: "Card 1",
                content: "Content1"
            },
            {
                title: "Card 2",
                content: "Content2"
            },
            {
                title: "Card 3",
                content: "Content3"
            },
        ];
        return(
      
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Hero/>
                        </Col>
                    </Row>
                    <Row>
                        <Col mdOffset={2} md={8}>
                            <Section/>
                        </Col>
                    </Row>
                    <Row>
                        <Col mdOffset={2} md={8}>
                        <CardList data={cardData}/>
                        </Col>
                    </Row>
                </Grid>
            
            
        )
    }
}