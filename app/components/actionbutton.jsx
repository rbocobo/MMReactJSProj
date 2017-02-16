import React, { Component } from "react";
import { Button, ButtonGroup, Glyphicon } from "react-bootstrap";

export default class ActionButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      isEdit:false
    }
  }
  handleEditClick(){
    this.setState({
      isEdit:true
    });
    this.props.EditClicked();
  }
  handleCancelClick(){
    this.setState({
      isEdit:false
    });
    this.props.CancelClicked();
  }
  handleSaveClick(){
    this.setState({
      isEdit:false
    });
    this.props.SaveClicked();
  }
  handleDeleteClick(){
    this.props.DeleteClicked();
  }
  render(){
    if(this.state.isEdit){
      return(
        <ButtonGroup>
        <Button bsStyle="success" onClick={()=>this.handleSaveClick()}><Glyphicon glyph="floppy-save"/></Button>
          <Button bsStyle="warning" onClick={this.handleCancelClick.bind(this)}><Glyphicon glyph="remove"/></Button>
        </ButtonGroup>
      )
    }
    else{
      return(
        <ButtonGroup>
          <Button bsStyle="primary" onClick={this.handleEditClick.bind(this)}><Glyphicon glyph="pencil"/></Button>
          <Button bsStyle="danger" onClick={()=>this.handleDeleteClick()}><Glyphicon glyph="trash"/></Button>
        </ButtonGroup>
      )
    }
  }
}

ActionButton.propTypes = {
  EditClicked : React.PropTypes.func.isRequired,
  CancelClicked : React.PropTypes.func.isRequired,
  SaveClicked : React.PropTypes.func.isRequired,
  DeleteClicked: React.PropTypes.func.isRequired
};
