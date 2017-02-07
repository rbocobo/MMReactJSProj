import React, { Component } from "react";
import { ButtonToolbar,ButtonGroup,Button } from "react-bootstrap";
import _ from "lodash";
export default class Pager extends Component{
    
    constructor(props){
        super(props);

        let numberOfPage = this.props.rowCount / this.props.itemsPerPage;
        numberOfPage = Math.ceil(numberOfPage); //(this.props.rowCount % this.props.itemsPerPage) > 0 ? Math.floor(numberOfPage) + 1 : numberOfPage;

        this.state = {
            page: this.props.page,
            itemsPerPage: this.props.itemsPerPage,
            rowCount: this.props.rowCount,
            numberOfPage: numberOfPage
        }
        console.log(this.state);
    }



    render(){
        return(
            <ButtonToolbar>
                <ButtonGroup>
                {
                   _.times(this.state.numberOfPage, i =>{
                        return <Button>{++i}</Button>
                    })
                }
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
}

Pager.propTypes = {
    page: React.PropTypes.number.isRequired,
    itemsPerPage: React.PropTypes.number.isRequired,
    rowCount: React.PropTypes.number.isRequired
}