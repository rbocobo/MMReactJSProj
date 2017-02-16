import React from 'react';
import Styles from "../css/app.css";

let Layout = props => { return <div className={Styles.wrap}>{props.children}</div> };

export default Layout
