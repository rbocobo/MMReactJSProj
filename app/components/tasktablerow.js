import React from "react";
import {FormControl} from "react-bootstrap";
import ActionButton from "./actionbutton";
import Select from "react-select";

export default class TaskTableRow extends React.Component {
    constructor(props){
        super(props);
        //console.log(this.props.data);
        this.state = {
            isEdit : false,
            id : this.props.data.id,
            taskName : this.props.data.TaskName,
            taskDescription : this.props.data.TaskDescription,
            priority : this.props.data.Priority,
            status : this.props.data.Status,
            oldState: {}

        };
        console.log(this.state);
    }

    Edit(){
      let oldState = {
        id : this.state.id,
        taskName : this.state.taskName,
        taskDescription : this.state.taskDescription,
        priority : this.state.priority,
        status : this.state.status,
      };

      this.setState({isEdit:true, oldState: oldState});

      console.log("Edit");
    }

    Save(){
      this.setState({isEdit:false});
      console.log("Save");
    }

    Cancel(){
      this.setState({isEdit:false});
      var oldState = this.state.oldState;
      this.setState(oldState);
      console.log(this.state.oldState);
      console.log("Cancel");
    }

    handleChange(key, e){

        var state = {};
        state[key] = e.target.value;
        this.setState(state);

    }

    handleSelectChange(key, val){
      console.log("Selected:" + val.value);
      var state = {};
      state[key] = val.value;
      this.setState(state);
    }

    render(){
            var priorityOptions = [
              {
                  label: "High",
                  value: "High"
              },
              {
                  label: "Medium",
                  value: "Medium"
              },
              {
                  label: "Low",
                  value: "Low"
              }

            ]
            var statusOptions = [
              {label: "To Do", value:"To Do"},
              {label: "In Progress", value:"In Progress"},
              {label: "Done", value:"Done"},
            ]
            if(this.state.isEdit){
                return(
                <tr key={this.state.id}>
                <td>
                <div><FormControl type="text" value={this.state.taskName} onChange={e=>this.handleChange("taskName", e)}/></div>
                <div><small><FormControl type="text" value={this.state.taskDescription} onChange={e=>this.handleChange("taskDescription", e)}/></small></div>
                </td>
                <td>
                  <Select
                  name="priority"
                  value={this.state.priority}
                  options={priorityOptions}
                  onChange={e=> this.handleSelectChange("priority",e)}
                   />
                </td>
                <td>
                  <Select
                  name="status"
                  value={this.state.status}
                  options={statusOptions}
                  onChange={e=> this.handleSelectChange("status",e)}
                   />
                </td>
                <td className="centerText"><ActionButton SaveClicked={()=>this.Save()} EditClicked={()=> this.Edit()} CancelClicked={()=> this.Cancel()}/></td>
                </tr>
                );
            }
            else {
                return(
                <tr key={this.state.id}>
                <td>
                <div>{this.state.taskName}</div>
                <div><small>{this.state.taskDescription}</small></div>
                </td>
                <td>{this.state.priority}</td>
                <td>{this.state.status}</td>
                <td className="centerText"><ActionButton SaveClicked={()=>this.Save()} EditClicked={()=>this.Edit()} CancelClicked={()=> this.Cancel()}/></td>
                </tr>
                );
            }

    }
}

TaskTableRow.propTypes = {
  data: React.PropTypes.object.isRequired,
  updateRow: React.PropTypes.func.isRequired
}
