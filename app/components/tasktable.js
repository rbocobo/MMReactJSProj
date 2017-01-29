import React from "react";
import {Panel, Table} from "react-bootstrap";

export default class TaskTable extends React.Component{
  render(){
    return(
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
      <tr>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
      </tr>
      <tr>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
      </tr>
      <tr>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
      </tr>
    </tbody>
  </Table>
  </Panel>
    );
  }
}
