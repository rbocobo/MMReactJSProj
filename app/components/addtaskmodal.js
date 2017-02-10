import React, { Component } from "react";
import { Modal, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import DropDown from "./dropdown";

export default class AddTaskModal extends Component {
  constructor(props){
    super(props);
    this.state =
      {
        show: this.props.show,
        taskName:"",
        taskDescription:"",
        priority:"",
        status:"",
      }
    }

  handleSaveClicked(){
    let task = {
      id:-1,
      taskName:this.state.taskName,
      taskDescription:this.state.taskDescription,
      priority:this.state.priority,
      status:this.state.status,
    }
    console.log("saving");
    console.log(task);
    this.props.saveTask(task);

    this.setState({show: false});
  }

  handleCancelClicked(){
    this.props.cancelAdd();
    //this.setState({show: false});
  }

  handleChange(key, e){

      let state = {};
      state[key] = e.target.value;
      this.setState(state);
      console.log(this.state);
  }

  handleSelected(val){

      let state = {};
      state[val.type] = val.value;
      this.setState(state)
      console.log(this.state);
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps");
    this.setState({ show:nextProps.show })
  }

  render(){
    function FieldGroup({ id, label, help }) {
      return (
        <FormGroup controlId={id}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      );
    }
    return(
      <Modal show={this.state.show} onHide={()=>this.cancel()}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <FormGroup controlId="formControlstaskName">
              <ControlLabel>Task Name</ControlLabel>
              <FormControl type="text" placeholder="Enter Task Name" onChange={e=>this.handleChange("taskName", e)}/>
            </FormGroup>
            <FormGroup controlId="formControlstaskDescription">
              <ControlLabel>Task Description</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Enter Task Description" onChange={e=>this.handleChange("taskDescription", e)}/>
            </FormGroup>
            <FormGroup controlId="formControlspriority">
              <ControlLabel>priority</ControlLabel>
              <DropDown type="priority" selected={e=>this.handleSelected(e)}/>
            </FormGroup>
            <FormGroup controlId="formControlsstatus">
              <ControlLabel>status</ControlLabel>
              <DropDown type="status" selected={e=>this.handleSelected(e)}/>
            </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={()=>this.handleSaveClicked()}>Save</Button>
            <Button bsStyle="danger" onClick={()=> this.handleCancelClicked()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

AddTaskModal.props = {
  show : React.PropTypes.bool.isRequired,
  saveTask : React.PropTypes.func.isRequired
}

AddTaskModal.defaultProps = {
    show: false
}
