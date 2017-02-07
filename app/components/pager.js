import React, { Component } from "react";
import { ButtonToolbar,ButtonGroup,Button } from "react-bootstrap";
import _ from "lodash";
export default class Pager extends Component{
    
    constructor(props){
        super(props);

        let numberOfPage = this.props.rowCount / this.props.itemsPerPage;
        numberOfPage = Math.ceil(numberOfPage); 

        this.state = {
            page: this.props.page,
            itemsPerPage: this.props.itemsPerPage,
            rowCount: this.props.rowCount,
            numberOfPage: numberOfPage
        }
        console.log(this.state);
    }

    handlePageClick(i){
        this.setState({page:i});
        this.props.pageChanged(i);
    }

    componentWillReceiveProps(nextProps){
        let numberOfPage = nextProps.rowCount / nextProps.itemsPerPage;
        numberOfPage = Math.ceil(numberOfPage); //(this.props.rowCount % this.props.itemsPerPage) > 0 ? Math.floor(numberOfPage) + 1 : numberOfPage;

        this.state = {
            page: nextProps.page,
            itemsPerPage: nextProps.itemsPerPage,
            rowCount: nextProps.rowCount,
            numberOfPage: numberOfPage
        }
    }

    render(){
        return(
            <ButtonToolbar>
                <ButtonGroup>
                {
                   _.times(this.state.numberOfPage, i =>{
                        return <Button key={i} onClick={()=>this.handlePageClick(i)}>{++i}</Button>
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
    rowCount: React.PropTypes.number.isRequired,
    pageChanged: React.PropTypes.func.isRequired
}