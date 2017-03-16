import React, { Component } from 'react';

export default class TimerEntry extends Component{
  constructor(){
    super();
    this.state = {
      minutes:0,
      seconds:0
    }
  }

  handleMinutesChange(e){
    if(e.target.value <= 60){
    this.setState({minutes:parseInt(e.target.value)},()=>{
      this.fireTimerEntryChanged();
    });
    }
  }

  handleSecondsChange(e){
    if(e.target.value <= 59){
    this.setState({seconds:parseInt(e.target.value)},()=>{
      this.fireTimerEntryChanged();
    });
    }
  }

  fireTimerEntryChanged(){
    this.props.onChange(this.state);
  }

  render(){
    return(
    <div>
      <input type="number" min={0} max={60} style={{width:"40px"}} value={this.state.minutes} onChange={(e)=>{this.handleMinutesChange(e)}}/>
      <span>:</span>
      <input type="number" min={0} max={59} style={{width:"40px"}} value={this.state.seconds} onChange={(e)=>{this.handleSecondsChange(e)}}/>
    </div>
  );
  }
}


TimerEntry.propTypes = {
  onChange : React.PropTypes.func.isRequired
}
