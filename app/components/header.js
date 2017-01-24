import React from 'react';
import {Navbar} from 'react-bootstrap';
import Style from "../css/app.css";

const Header = () => {
    return(
            <Navbar staticTop>
                <Navbar.Header className={Style.centerText}>
                Header
                </Navbar.Header>
            </Navbar>
        );
}

export default Header 