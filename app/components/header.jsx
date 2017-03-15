import React from 'react';
import {Nav,NavItem,NavDropdown,MenuItem,Navbar,OverlayTrigger, Button,Popover,Modal} from 'react-bootstrap';
import Style from "../css/app.css";
import LinkContainer from 'react-router-bootstrap';
import PriorityTasksPopover from "./priorityTasksPopover";
import AddTaskPopover from "./addtaskpopover";
import PriorityTaskStore from "../stores/priorityTaskStore";
import TimerStore from "../stores/TimerStore";

export default class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeKey: 1,
      priorityTasks: PriorityTaskStore.getAll(),
      showNotification: false
    };
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
    this.setState({ showNotification: true });
  }

  componentWillMount(){
      TimerStore.on("timerended", this.showNotification.bind(this));
      PriorityTaskStore.on("change", this.refreshList.bind(this));
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
                <Modal show={this.state.showNotification} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Timer Finished</Modal.Title>
                    <Modal.Body>Timer Finished</Modal.Body>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                  </Modal.Footer>
                </Modal>

            </Navbar>
        );
      }
}
