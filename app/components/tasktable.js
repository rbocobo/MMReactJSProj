import React from "react";
import { Panel, Table, Button} from "react-bootstrap";
import TaskTableRow from "./tasktablerow";
import json from "!json!../json/task.json";
import AddTaskModal from "./addtaskmodal";
import _ from "lodash";
import Pager from "./pager";

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
    this.setState({tableData:json, showModal: false});
    console.log(this.state.tableData);
  }


  handleUpdateRow(val){
    console.log("handleUpdateRow");
    console.log(val);
    var data = json.map(item => {
      if(item.id == val.id){
        return val;
      }else{
        return item;
      }
    });
    this.setState({tableData:data});
  }

  handleDeleteRow(id){
    var data = _.filter(this.state.tableData, item => { return item.id != id })
    console.log(data);
    this.setState({tableData:data});
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
                <TaskTableRow key={item.id} data={item} updateRow={this.handleUpdateRow} deleteRow={val=>this.handleDeleteRow(val)}/>
              )
              })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
              <Pager page={1} itemsPerPage={5} rowCount={10}/>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Panel>
      <Button onClick={()=>this.handleAddTaskClicked()}>Add New</Button>
      <AddTaskModal show={this.state.showModal} saveTask={e=>this.handleSaveTask(e)}/>
    </div>
    );
  }
}
