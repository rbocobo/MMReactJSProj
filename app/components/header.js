import React from 'react';
import {Navbar} from 'react-bootstrap';

export default class Header extends React.Component{
    render(){
        return(
            <Navbar staticTop>
                <Navbar.Header>
                Header
                </Navbar.Header>
            </Navbar>
        );
    }
};