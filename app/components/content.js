import React,  {Component} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';

export default class Content extends Component{
    render(){
        return(
            <div className="container">
                <Col lg={12}>
                    <Panel>
                        hero
                    </Panel>
                </Col>
            </div>
            
        )
    }
}