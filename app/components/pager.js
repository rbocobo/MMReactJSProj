import React, { Component } from "react";
import { ButtonToolbar,ButtonGroup,Button, FormControl } from "react-bootstrap";
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
        console.log("Component will receive props");
        let numberOfPage = nextProps.rowCount / nextProps.itemsPerPage;
        numberOfPage = Math.ceil(numberOfPage); //(this.props.rowCount % this.props.itemsPerPage) > 0 ? Math.floor(numberOfPage) + 1 : numberOfPage;

        this.state = {
            page: nextProps.page,
            itemsPerPage: nextProps.itemsPerPage,
            rowCount: nextProps.rowCount,
            numberOfPage: numberOfPage
        }
    }

    handleSelect(e){
       this.props.itemsPerPageChanged(parseInt(e.target.value));
    }

    render(){
        return(
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <FormControl componentClass="select" placeholder="select" style={{width: "100px"}} onChange={this.handleSelect.bind(this)}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </FormControl>
                        </td>
                        <td>
                            <ButtonToolbar>
                                <ButtonGroup>
                                {
                                _.times(this.state.numberOfPage, i =>{
                                        return <Button key={i} onClick={()=>this.handlePageClick(i)}>{++i}</Button>
                                    })
                                }
                                </ButtonGroup>
                            </ButtonToolbar>
                        </td>
                    </tr>
                    </tbody>
                </table>
                
            </div>
        );
    }
}

Pager.propTypes = {
    page: React.PropTypes.number.isRequired,
    itemsPerPage: React.PropTypes.number.isRequired,
    rowCount: React.PropTypes.number.isRequired,
    pageChanged: React.PropTypes.func.isRequired,
    itemsPerPageChanged: React.PropTypes.func.isRequired
}