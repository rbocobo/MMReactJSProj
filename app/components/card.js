import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Col from 'react-bootstrap/lib/Col';

export default class Card extends React.Component{
    render(){
        return(
            <Col md={4}>
                <Panel header={this.props.title}>
                {this.props.content}
                </Panel>
            </Col>
        );
    }
}