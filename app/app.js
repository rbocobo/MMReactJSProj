'use strict';

import React from 'react';
import ReactDOM from'react-dom';
import Bootstrap from '!style!css!bootswatch/darkly/bootstrap.css';
import Layout from "./components/layout";
import Header from "./components/header";
import Footer from "./components/footer";
import Content from "./components/content";
import Styles from "./css/app.css";

export default class KanbanApplication extends React.Component{
    render(){
        return( <div>
                    <Layout>
                        <Header/>
                        <Content/>
                        <Footer/>
                    </Layout>
                    
                </div>
        );
    }
};




ReactDOM.render(
    <KanbanApplication/>,
    document.getElementById('root')
);
