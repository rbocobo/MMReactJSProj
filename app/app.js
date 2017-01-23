'use strict';

import React from 'react';
import ReactDOM from'react-dom';
//import Bootstrap from '!style!css!bootstrap/dist/css/bootstrap.css';
import Bootstrap from '!style!css!bootswatch/slate/bootstrap.css';
import Header from "./components/header";
import Footer from "./components/footer";
import Content from "./components/content";
import Styles from "./css/app.css";

export default class KanbanApplication extends React.Component{
    render(){
        return( <div>
                    <div className={Styles.wrap}>
                        <Header/>
                        <Content/>
                    </div>
                    <Footer/>
                </div>
        );
    }
};




ReactDOM.render(
    <KanbanApplication/>,
    document.getElementById('root')
);
