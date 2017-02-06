'use strict';

import React from 'react';
import ReactDOM from'react-dom';
import Bootstrap from 'bootswatch/spacelab/bootstrap.css';
import Layout from "./components/layout";
import Header from "./components/header";
import Footer from "./components/footer";
//import Content from "./components/content";
import Styles from "./css/app.css";
import SelectStyles from "react-select/dist/react-select.css";

export default class App extends React.Component{
    render(){
        return( <div>
                    <Layout>
                        <Header/>

                        {this.props.children}

                        <Footer/>
                    </Layout>

                </div>
        );
    }
};




//ReactDOM.render(
//    <App/>,
//    document.getElementById('root')
//);
