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
            taskName : this.props.data.taskName,
            taskDescription : this.props.data.taskDescription,
            priority : this.props.data.priority,
            status : this.props.data.status,
            edittaskName: "",
            edittaskDescription: "",
            editpriority: "",
            editstatus: ""

        };
        console.log(this.state);
    }

    handleEdit(){

      this.setState({
        isEdit:true,
        edittaskName: this.state.taskName,
        edittaskDescription: this.state.taskDescription,
        editpriority: this.state.priority,
        editstatus: this.state.status
      });

      console.log("Edit");
    }

    handleSave(){
      this.setState({isEdit:false});
      let state = {
        id : this.state.id,
        taskName : this.state.edittaskName,
        taskDescription : this.state.edittaskDescription,
        priority : this.state.editpriority,
        status : this.state.editstatus,
      };
      this.props.updateRow(state);
      console.log("Save");
    }

    handleCancel(){
      this.setState({isEdit:false});
      let oldState = this.state.oldState;
      this.setState(oldState);
      console.log(this.state.oldState);
      console.log("Cancel");
    }

    handleDelete(){
      this.props.deleteRow(this.state.id);
    }

    handleChange(key, e){

        let state = {};
        state[key] = e.target.value;
        this.setState(state);

    }

    handleSelectChange(key, val){
      console.log("Selected:" + val.value);
      let state = {};
      state[key] = val.value;
      this.setState(state);
    }

    componentWillReceiveProps(nextProps){
      console.log("Updating Table Row");
      this.setState({
        taskName:nextProps.data.taskName,
        taskDescription:nextProps.data.taskDescription,
        priority:nextProps.data.priority,
        status:nextProps.data.status
      });
    }
    render(){
            let priorityOptions = [
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
            let statusOptions = [
              {label: "To Do", value:"To Do"},
              {label: "In Progress", value:"In Progress"},
              {label: "Done", value:"Done"},
            ]
            if(this.state.isEdit){
                return(
                <tr key={this.state.id}>
                <td>
                <div><FormControl type="text" value={this.state.edittaskName} onChange={e=>this.handleChange("edittaskName", e)}/></div>
                <div><small><FormControl type="text" value={this.state.edittaskDescription} onChange={e=>this.handleChange("edittaskDescription", e)}/></small></div>
                </td>
                <td>
                  <Select
                  name="priority"
                  value={this.state.editpriority}
                  options={priorityOptions}
                  onChange={e=> this.handleSelectChange("editpriority",e)}
                   />
                </td>
                <td>
                  <Select
                  name="status"
                  value={this.state.editstatus}
                  options={statusOptions}
                  onChange={e=> this.handleSelectChange("editstatus",e)}
                   />
                </td>
                <td className="centerText"><ActionButton
                  SaveClicked={()=>this.handleSave()}
                  EditClicked={()=> this.handleEdit()}
                  CancelClicked={()=> this.handleCancel()}
                  DeleteClicked={()=> this.handleDelete()}
                  /></td>
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
                <td className="centerText"><ActionButton
                  SaveClicked={()=>this.handleSave()}
                  EditClicked={()=>this.handleEdit()}
                  CancelClicked={()=> this.handleCancel()}
                  DeleteClicked={()=> this.handleDelete()}
                  /></td>
                </tr>
                );
            }

    }
}

TaskTableRow.propTypes = {
  data: React.PropTypes.object.isRequired,
  updateRow: React.PropTypes.func.isRequired,
  deleteRow: React.PropTypes.func.isRequired
}
