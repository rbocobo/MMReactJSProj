import React, { Component } from 'react';
import {Table, Button} from 'react-bootstrap';
import TimerStore from '../stores/timerStore';
import * as TimerActions from "../actions/timerActions";
import TimerEntry from "./timerentry";

export default class TimerConfig extends Component{
  constructor(){
    super();
    this.state={
      configs:TimerStore.getConfigs(),
      name:"",
      pomodoro:{},
      shortbreak:{},
      longbreak:{}
    }

    this.refreshList = this.refreshList.bind(this)
  }

  renderRows(){
    return this.state.configs.map((item)=>{
      return(<tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.pomodoro.minutes + ':' + item.pomodoro.seconds}</td>
        <td>{item.shortbreak.minutes + ':' + item.shortbreak.seconds}</td>
        <td>{item.longbreak.minutes + ':' + item.longbreak.seconds}</td>
        <td></td>
      </tr>);
    })
  }

  componentWillMount(){
      TimerStore.on("change", this.refreshList);
  }

  componentWillUnmount(){
    TimerStore.removeListener("change", this.refreshList);
  }

  refreshList(){
    this.setState({configs:TimerStore.getConfigs()});
  }
handleNameChange(e){
 this.setState({name:e.target.value});
}

handlePomodoroTimeChange(t){
  this.setState({pomodoro:t});
}

handleShortBreakTimeChange(t){
  this.setState({shortbreak:t});
}

handleLongBreakTimeChange(t){
  this.setState({longbreak:t});
}

handleClick(){
  TimerActions.addTimerConfig({
    name: this.state.name,
    pomodoro: this.state.pomodoro,
    shortbreak: this.state.shortbreak,
    longbreak: this.state.longbreak
  });
}

render(){
    return(
    <Table  striped bordered condensed hover responsive>
      <thead>
        <tr>
          <td>Name</td>
          <td>Pomodoro</td>
          <td>Short Break</td>
          <td>Long Break</td>
          <td></td>
        </tr>

      </thead>
      <tbody>
      {this.renderRows()}

      <tr>
        <td><input type="text" onChange={(e)=>this.handleNameChange(e)}/></td>
        <td><TimerEntry onChange={(t)=>this.handlePomodoroTimeChange(t)}/></td>
        <td><TimerEntry onChange={(t)=>this.handleShortBreakTimeChange(t)}/></td>
        <td><TimerEntry onChange={(t)=>this.handleLongBreakTimeChange(t)}/></td>
        <td><Button onClick={this.handleClick.bind(this)}>Save</Button></td>
      </tr>
    </tbody>
    </Table>);
  }
}
