import React, { Component } from "react";
import { Button, Glyphicon } from "react-bootstrap";

export default class Sorter extends Component{
    constructor(props){
        super(props);
        this.state = {
            direction: props.direction,
            field: props.field,
            glyph: props.direction == "asc" ? "chevron-up" : "chevron-down"
        }
    }
    handleClick(){
        if(this.state.glyph == "chevron-up"){
            this.setState({glyph: "chevron-down"});
            this.props.sort({field:this.state.field,direction: "desc"});
        } else {
            this.setState({glyph: "chevron-up"});
            this.props.sort({field:this.state.field,direction: "asc"});
        }
    }
    render(){
        return(
            <Glyphicon glyph={this.state.glyph} onClick={()=>this.handleClick()} />
        );
    }
}