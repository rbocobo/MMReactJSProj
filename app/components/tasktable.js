import React from "react";
import { Panel, Table, Button} from "react-bootstrap";
import TaskTableRow from "./tasktablerow";
import json from "!json!../json/task.json";
import AddTaskModal from "./addtaskmodal";

export default class TaskTable extends React.Component{
  constructor(props){
    super(props);
    console.log(json);

    this.state = {
      tableData:json,
      showModal: false
    };

  }

  handleAddTaskClicked(){
    console.log("Add Task");
    this.setState({showModal:true});
  }

  handleSaveTask(e){
    json.push(e);
    this.setState({tableData:json});
    console.log(this.state.tableData);
  }

  render(){

    return(
      <div className="container">
        <Panel header="Task Master List" bsStyle="info">
          <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th>Task Details</th>
              <th>Priority</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((item)=>{
              return (
                <TaskTableRow key={item.id} data={item}/>
              )
              })}
          </tbody>
        </Table>
      </Panel>
      <Button onClick={()=>this.handleAddTaskClicked()}>Add New</Button>
      <AddTaskModal show={this.state.showModal} saveTask={e=>this.handleSaveTask(e)}/>
    </div>
    );
  }
}
