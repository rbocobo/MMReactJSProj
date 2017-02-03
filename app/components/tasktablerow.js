import React from "react";
import {FormControl} from "react-bootstrap";

export default class TaskTableRow extends React.Component {
    constructor(props){
        super(props);
        //console.log(this.props.data);
        this.state = {
            isEdit : true,
            task : {
                id : this.props.data.id,
                taskName : this.props.data.TaskName,
            taskDescription : this.props.data.TaskDescription,
            priority : this.props.data.Priority,
            status : this.props.data.Status
            }
        };
        //console.log(this.state);
    }
    render(){
        
            if(this.state.isEdit){
                return(
                <tr key={this.state.task.id}>
                <td>
                <div><FormControl type="text" /></div>
                <div><small>{this.state.task.taskDescription}</small></div>
                </td>
                <td>{this.state.task.priority}</td>
                <td>{this.state.task.status}</td>
                <td></td>
                </tr>
                );
            }
            else {
                return(
                <tr key={this.state.task.id}>
                <td>
                <div>{this.state.task.taskName}</div>
                <div><small>{this.state.task.taskDescription}</small></div>
                </td>
                <td>{this.state.task.priority}</td>
                <td>{this.state.task.status}</td>
                <td></td>
                </tr>
                );
            }
        
    }
}


