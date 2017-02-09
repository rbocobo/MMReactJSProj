import React from "react";
import { Panel, Table, Button} from "react-bootstrap";
import TaskTableRow from "./tasktablerow";
import json from "!json!../json/task.json";
import AddTaskModal from "./addtaskmodal";
import _ from "lodash";
import Pager from "./pager";
import Sorter from "./sorter";
import ConfirmModal from "./confirmmodal";

export default class TaskTable extends React.Component{
  constructor(props){
    super(props);


    let skipCount = 0;
    let takeCount = 10;
    let tableData = _.filter(json,i=>{ return true; });
    let pagedData = _.take(_.drop(tableData, skipCount), takeCount);
    this.state = {
      tableData:tableData,
      showModal: false,
      showConfirmModal: false,
      deleteId: 0,
      rowCount: tableData.length,
      page: 1,
      pagedData: pagedData,
      numOfItems: 10
    };


    console.log(pagedData);
  }

  handleAddTaskClicked(){
    console.log("Add Task");
    this.setState({showModal:true});
  }

  handleSaveTask(e){
    let id = _.random(_.now());
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
    let skipCount = page == 1 ? 0 : (page - 1) * this.state.numOfItems;
    let takeCount = this.state.numOfItems;
    let pagedData = _.take(_.drop(tabledata, skipCount), takeCount);
    console.log("New Paged Data");
    console.log(pagedData);
    this.setState({page:page,pagedData:pagedData,tableData:tabledata, rowCount: tabledata.length});
    
  }

  handleUpdateRow(val){
    console.log("handleUpdateRow");
    console.log(val);
    let data = this.state.tableData.map(item => {
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

  handleConfirmDelete(){
    let data = _.filter(this.state.tableData, item => { return item.id != this.state.deleteId })
    this.setState({showConfirmModal:false, deleteId: 0},()=>{
        this.setPagedData(this.state.page, data);
    });
    console.log(data);
    console.log(this.state.tableData);
  }

  handleDeleteRow(id){
    this.setState({showConfirmModal:true, deleteId: id});
    
  }

  handlePageChanged(page){
    this.setPagedData(page, this.state.tableData);
  }

  handleSort(arg){
    let data = [];

    switch(arg.field){
      case "TaskName":
      data = _.orderBy(this.state.tableData,[arg.field],[arg.direction]);
      break;

      case "Priority":

       data = _.sortBy(this.state.tableData, (e)=>{
          const rankAsc = {
            "Low" : 1,
            "Medium" : 2,
            "High" : 3 
          };
          const rankDesc = {
            "High" : 1,
            "Medium" : 2,
            "Low" : 3
          }
          if(arg.direction == "asc")
          return rankAsc[e.Priority];
          else
          return rankDesc[e.Priority]
        })
      
      break;

      case "Status":

       data = _.sortBy(this.state.tableData, (e)=>{
          const rankAsc = {
            "To Do" : 1,
            "In Progress" : 2,
            "Done" : 3 
          };
          const rankDesc = {
            "Done" : 1,
            "In Progress" : 2,
            "To Do" : 3
          }
          if(arg.direction == "asc")
          return rankAsc[e.Status];
          else
          return rankDesc[e.Status]
        })
      
      break;
    }
    
    
    this.setState({tabledata:data, rowCount: data.length},()=>{
      this.setPagedData(this.state.page, data);
    })
  }

  handleItemsPerPageChanged(numOfItems){
    this.setState({numOfItems:numOfItems},()=>{
      this.setPagedData(this.state.page, this.state.tableData);
    });
    
  }
  
  render(){

    return(
      <div className="container">
        <Panel header="Task Master List" bsStyle="info">
          <div style={{height:"500px", overflow: "scroll"}}>
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
          
        </Table>
       
        </div>
         <Pager page={this.state.page} 
              itemsPerPage={this.state.numOfItems} 
              rowCount={this.state.rowCount} 
              pageChanged={(page)=>this.handlePageChanged(page)}
              itemsPerPageChanged={this.handleItemsPerPageChanged.bind(this)}
              />
      </Panel>
      <Button onClick={()=>this.handleAddTaskClicked()}>Add New</Button>
      <AddTaskModal show={this.state.showModal} saveTask={e=>this.handleSaveTask(e)}/>
      <ConfirmModal show={this.state.showConfirmModal} title={"Confirm Delete"} message="Please confirm this record will be deleted" confirm={this.handleConfirmDelete.bind(this)} />
    </div>
    );
  }
}
