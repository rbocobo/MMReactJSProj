import React from "react";
import { Panel, Table, Button} from "react-bootstrap";
import TaskTableRow from "./tasktablerow";
import json from "!json!../json/task.json";
import AddTaskModal from "./addtaskmodal";
import _ from "lodash";
import Pager from "./pager";
import Sorter from "./sorter";
const defaultData = [{
  "id":1,
	"TaskName": "1 Watch Cable TV",
	"TaskDescription": "Australian Open 2017",
	"Priority": "Medium",
	"Status": "In Progress"
}, {
  "id":2,
	"TaskName": "2 Finish Assignment ",
	"TaskDescription": "Magenic Masters Assignment 2",
	"Priority": "Medium",
	"Status": "In Progress"
}, {
  "id":3,
	"TaskName": "3 Itaque earum rerum hic tenetur a sapiente delectus ",
	"TaskDescription": "nisi ut aliquid ex ea commodi consequatur",
	"Priority": "High",
	"Status": "In Progress"
}
, {
  "id":4,
	"TaskName": "4 Temporibus autem quibusdam et aut officiis ",
	"TaskDescription": "Neque porro quisquam est",
	"Priority": "Low",
	"Status": "Done"
}
, {
  "id":5,
	"TaskName": "5 Quis autem vel eum iure reprehenderit ",
	"TaskDescription": "vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
	"Priority": "High",
	"Status": "Done"
}
, {
  "id":6,
	"TaskName": "6 Et harum quidem rerum facilis est et expedita distinctio ",
	"TaskDescription": "Nam libero tempore",
	"Priority": "Low",
	"Status": "Done"
}
, {
  "id":7,
	"TaskName": "7 de Finibus Bonorum et Malorum",
	"TaskDescription": "At vero eos et accusamus et iusto",
	"Priority": "High",
	"Status": "In Progress"
}
, {
  "id":8,
	"TaskName": "8 Sed ut perspiciatis unde omnis iste natus error sit voluptatem ",
	"TaskDescription": "accusantium doloremque laudantium",
	"Priority": "Medium",
	"Status": "To do"
}
, {
  "id":9,
	"TaskName": "9 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
	"TaskDescription": "Ut enim ad minim veniam",
	"Priority": "High",
	"Status": "Done"
}
, {
  "id":10,
	"TaskName": "10 Lorem ipsum dolor sit amet ",
	"TaskDescription": "consectetur adipiscing elit",
	"Priority": "High",
	"Status": "To do"
}, {
  "id":11,
	"TaskName": "11 Task 11 ",
	"TaskDescription": "consectetur adipiscing elit",
	"Priority": "High",
	"Status": "To do"
}
];

export default class TaskTable extends React.Component{
  constructor(props){
    super(props);


    let skipCount = 0;
    let takeCount = 5;
    let tableData = _.filter(json,i=>{ return true; });
    let pagedData = _.take(_.drop(tableData, skipCount), takeCount);
    this.state = {
      tableData:tableData,
      showModal: false,
      rowCount: tableData.length,
      page: 1,
      pagedData: pagedData
    };


    console.log(pagedData);
  }

  handleAddTaskClicked(){
    console.log("Add Task");
    this.setState({showModal:true});
  }

  handleSaveTask(e){
    let id = this.state.tableData.length + 1;
    e.id = id;//this.state.tableData.length++;
    let data = this.state.tableData;
    data.push(e); //_.concat(this.state.tableData, e);
    console.log("Added Task");
    console.log(data);
    this.setState({tableData:data, showModal: false, rowCount:data.length });
    console.log(this.state.tableData);
    this.setPagedData(this.state.page, data);
  }

  setPagedData(page,tabledata){
    console.log("Page: " + page);
    console.log(this.state.tableData);
    let skipCount = page == 1 ? 0 : (page - 1) * 5;
    let takeCount = 5;
    let pagedData = _.take(_.drop(tabledata, skipCount), takeCount);
    console.log("New Paged Data");
    console.log(pagedData);
    this.setState({page:page,pagedData:pagedData,tableData:tabledata, rowCount: tabledata.length});
    
  }

  handleUpdateRow(val){
    console.log("handleUpdateRow");
    console.log(val);
    var data = this.state.tableData.map(item => {
      if(item.id == val.id){
        
        return val;
      }else{
        return item;
      }
    });
    console.log(data);
    this.setState({tableData:data, rowCount:data.length},()=>{
      console.log(data);
      this.setPagedData(this.state.page, data);
    });
    
  }

  handleDeleteRow(id){
    let data = _.filter(this.state.tableData, item => { return item.id != id })
    this.setPagedData(this.state.page, data);
    console.log(data);
    console.log(this.state.tableData);
  }

  handlePageChanged(page){
    this.setPagedData(page, this.state.tableData);
  }
  handleSort(arg){
    var data = _.orderBy(this.state.tableData,[arg.field],[arg.direction]);
    console.log("SORT");
    console.log(data);
    this.setState({tabledata:data, rowCount: data.length},()=>{
      this.setPagedData(this.state.page, data);
    })
  }
  render(){

    return(
      <div className="container">
        <Panel header="Task Master List" bsStyle="info">
          <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th>Task Details <Sorter field="TaskName" direction="asc" sort={arg=>this.handleSort(arg)}/></th>
              <th>Priority <Sorter field="Priority" direction="asc" sort={arg=>this.handleSort(arg)}/></th>
              <th>Status <Sorter field="Status" direction="asc" sort={arg=>this.handleSort(arg)}/></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.pagedData.map((item)=>{
              return (
                <TaskTableRow key={item.id} data={item} updateRow={val=>this.handleUpdateRow(val)} deleteRow={val=>this.handleDeleteRow(val)}/>
              )
              })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
              <Pager page={this.state.page} itemsPerPage={5} rowCount={this.state.rowCount} pageChanged={(page)=>this.handlePageChanged(page)}/>
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
