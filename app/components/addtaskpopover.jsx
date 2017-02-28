import React, { Component } from "react";
import { Popover, OverlayTrigger, NavItem, Panel, Button, FormGroup, FormControl, ControlLabel  } from "react-bootstrap";
import DropDown from "./dropdown";
import * as TaskActions from "../actions/taskActions";

export default class AddTaskPopover extends Component {
        renderForm (){
        return  (
        <Popover id="popover-add-task" title="Add New Task" style={{height:"450px", width:"250px"}}>
          <div>
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
            <Button bsStyle="success" onClick={()=>this.handleSaveClicked()}>Save</Button>
            <Button bsStyle="danger" onClick={()=> this.handleCancelClicked()}>Cancel</Button>
          </div>
        </Popover>
      );
    }

      constructor(props){
        super(props);
        this.state =
          {
            show: props.show,
            taskName:"",
            taskDescription:"",
            priority:"",
            status:"",
          }
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

      resetForm(){
        this.setState({
          taskName:"",
          taskDescription:"",
          priority:"",
          status:"",
        })
      }

      handleSaveClicked(){
        TaskActions.createTask(this.state);
        this.refs.overlay.hide();
        this.resetForm();
      }

      handleCancelClicked(){
        this.refs.overlay.hide();
        this.resetForm();
      }

      render(){
        return (

          <OverlayTrigger trigger="click" ref="overlay" placement="bottom"  overlay={this.renderForm()}>
            <NavItem>Add Task</NavItem>
          </OverlayTrigger>
        );
    }
}
