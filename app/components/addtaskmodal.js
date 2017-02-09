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
      TaskName:this.state.taskName,
      TaskDescription:this.state.taskDescription,
      Priority:this.state.priority,
      Status:this.state.status,
    }
    console.log("saving");
    console.log(task);
    this.props.saveTask(task);

    this.setState({show: false});
  }

  handleCancelClicked(){
    this.setState({show: false});
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
            <FormGroup controlId="formControlsTaskName">
              <ControlLabel>Task Name</ControlLabel>
              <FormControl type="text" placeholder="Enter Task Name" onChange={e=>this.handleChange("taskName", e)}/>
            </FormGroup>
            <FormGroup controlId="formControlsTaskDescription">
              <ControlLabel>Task Description</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Enter Task Description" onChange={e=>this.handleChange("taskDescription", e)}/>
            </FormGroup>
            <FormGroup controlId="formControlsPriority">
              <ControlLabel>Priority</ControlLabel>
              <DropDown type="priority" selected={e=>this.handleSelected(e)}/>
            </FormGroup>
            <FormGroup controlId="formControlsStatus">
              <ControlLabel>Status</ControlLabel>
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
