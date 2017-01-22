'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
//var Bootstrap = require("!style!css!bootstrap/dist/css/bootstrap.css");

var KanbanApplication = React.createClass({
    render: function(){
        var elapsed = Math.round(this.props.elapsed / 100);
        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0');
        var message = 
        'Hello World! React has been successfully running for ' + seconds + ' seconds.';

        return <div className="panel panel-default">
                ROD
                
                </div>
    }
});

var start = new Date().getTime();

setInterval(function(){
    ReactDOM.render(
        <KanbanApplication elapsed={new Date().getTime() - start }/>,
        document.getElementById('root')
    );
}, 50);