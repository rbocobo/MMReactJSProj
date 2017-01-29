import React from "react";
import {Panel, Table} from "react-bootstrap";
import TaskTableRow from "./tasktablerow";

export default class TaskTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tableData:[
      {
        id: 1,
        TaskName:"Watch TV ",
        TaskDescription:"Australian Open 2017",
        Priority:"Medium",
        Status:"In Progress"
      },
      {
        id: 2,
        TaskName:"Finish Assignment",
        TaskDescription:"Magenic Masters Assignment 2",
        Priority:"Medium",
        Status:"In Progress"
      },
      {
        id: 3,
        TaskName:"Cook Dinner",
        TaskDescription:"Roast Chicken",
        Priority:"High",
        Status:"Done"
      }
    ]
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
