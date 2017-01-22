'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Bootstrap = require("!style!css!bootstrap/dist/css/bootstrap.css");
import Header from "./components/header";
import Content from "./components/content";

var KanbanApplication = React.createClass({
    render: function(){
        var elapsed = Math.round(this.props.elapsed / 100);
        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0');
        var message = 
        'Hello World! React has been successfully running for ' + seconds + ' seconds.';

        return <div>
                <Header/>
                <Content/>
                </div>
    }
});




ReactDOM.render(
    <KanbanApplication/>,
    document.getElementById('root')
);
