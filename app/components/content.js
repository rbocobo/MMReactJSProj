import React,  {Component} from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import Hero from './hero';
import Section from './section';
import CardList from './cardlist';

export default class Content extends Component{
    render(){
        var cardData = [
            {
                title: "Card 1",
                content: "Content1"
            },
            {
                title: "Card 2",
                content: "Content1"
            },
            {
                title: "Card 3",
                content: "Content1"
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