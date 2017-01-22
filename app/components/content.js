import React,  {Component} from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import Hero from './hero';
import Section from './section';

export default class Content extends Component{
    render(){
        return(
      
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Hero/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}/>
                        <Col md={8}>
                            <Section/>
                        </Col>
                        <Col md={2}/>
                    </Row>
                </Grid>
            
            
        )
    }
}