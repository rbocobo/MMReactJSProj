import React from 'react';
import {Nav,NavItem,NavDropdown,MenuItem,Navbar,OverlayTrigger, Button,Popover,Modal} from 'react-bootstrap';
import Style from "../css/app.css";
import 'react-notifications/lib/notifications.css';
import LinkContainer from 'react-router-bootstrap';
import PriorityTasksPopover from "./priorityTasksPopover";
import AddTaskPopover from "./addtaskpopover";
import PriorityTaskStore from "../stores/priorityTaskStore";
import TimerStore from "../stores/TimerStore";
import * as TaskActions from "../actions/TaskActions";

import {NotificationContainer, NotificationManager} from 'react-notifications';

export default class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeKey: 1,
      priorityTasks: PriorityTaskStore.getAll()
    };

    this.showNotification = this.showNotification.bind(this);
    this.refreshList = this.refreshList.bind(this);
  }
  getInitialState(){
    return {activeKey: 1};
  }
  handleSelect(selectedKey){
    //console.log(selectedKey);
    //this.setState({activeKey: selectedKey});
  }

  refreshList(){
    console.log("header:refreshList")
    this.setState({
      priorityTasks: PriorityTaskStore.getAll()
    });
  }

  showNotification(){
    const task = TimerStore.getTask();
    NotificationManager.success(task.taskName, "Timer Ended", 10000);

    TaskActions.updateElapsedTask({
       task: TimerStore.getTask(),
       elapsed: TimerStore.getElapsed()
     });

  }

  componentWillMount(){
      TimerStore.on("timerended", this.showNotification);
      PriorityTaskStore.on("change", this.refreshList);
  }

  componentWillUnmount(){
    TimerStore.on("timerended", this.showNotification);
    PriorityTaskStore.removeListener("change", this.refreshList);
  }

  close() {
    this.setState({ showNotification: false });
  }

  render(){
    return(
            <Navbar staticTop>
                <Navbar.Header className={Style.centerText}>
                <Navbar.Brand>
                    <a href="">Magenic Masters</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav activeKey={this.state.activeKey}>
                    <NavItem eventKey={1} href="#/" >Dashboard</NavItem>
                    <NavItem eventKey={2} href="#/tasktable">Tasks</NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <PriorityTasksPopover data={this.state.priorityTasks}/>
                    <AddTaskPopover show={true}/>
                </Nav>
                </Navbar.Collapse>

                <NotificationContainer/>
            </Navbar>
        );
      }
}
