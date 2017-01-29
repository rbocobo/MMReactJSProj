import React from "react";
import {Panel, Table} from "react-bootstrap";
import TaskTableRow from "./tasktablerow";
import json from "!json!../json/task.json";

export default class TaskTable extends React.Component{
  constructor(props){
    super(props);
    console.log(json);
    this.state = {
      tableData:json
    };
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
    </div>
    );
  }
}
