import React from 'react';
import {Nav,NavItem,NavDropdown,MenuItem,Navbar} from 'react-bootstrap';
import Style from "../css/app.css";
import LinkContainer from 'react-router-bootstrap';

export default class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeKey: 1
    };
  }
  getInitialState(){
    return {activeKey: 1};
  }
  handleSelect(selectedKey){
    console.log(selectedKey);
    this.setState({activeKey: selectedKey});
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
                <Nav>
                    <NavItem eventKey={1} href="#/" >Kanban</NavItem>
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
                    <NavItem eventKey={1} href="#">Link Right</NavItem>
                    <NavItem eventKey={2} href="#">Link Right</NavItem>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
      }
}
