import React,{ Component } from 'react';
import {Button, ButtonGroup, Panel } from 'react-bootstrap';

  let timer = '';
export default class Timer extends Component{
  constructor(props){
    super(props);
    this.state = {
			timeDisplay: {
				minutes: this.props.minutes,
				seconds: this.props.seconds
			},
			timerStarted: 0,
			timerStoped: 0,
			timerEnded: 0
    };
  }



  handleTimerStop() {
		console.log('Timer Stopped');
		clearInterval(this.timer);
		this.setState({
			timerStarted: 0,
			timerStopped: 1
		});
	}

  handleTimerStart(){
    console.log('Time Started');

    if(this.state.timerEnded){
      this.handleTimerReset();
      return;
    }

    this.setState({
      timerStarted:1,
      timerStoped:0,
      timerEnded:0
    });

    let self = this;
    let time = this.state.timeDisplay;

    this.timer = setInterval(()=>{
      if(time.seconds > 0){
        time.seconds--;
        this.setState({
          timeDisplay: time
        });
      }else if(time.seconds === 0 && time.minutes > 0){
        time.minutes--;
        time.seconds = 60;
        self.setState({
          timeDisplay:time
        });
      }else{
        this.handleTimerEnd();
      }
    },1000);

  }

  handleTimerEnd(){
    console.log('Timer Ended');
    clearInterval(this.timer);
    this.setState({
      timerStarted: 0,
      timerEnded: 1
    });
  }

  handleTimerReset(){
    console.log('Timer Reset');
    let minutes = this.props.minutes;
    let seconds = this.props.seconds;
    this.setState({
			timeDisplay: {
				minutes: minutes,
				seconds: seconds
			},
			timerStarted: 0,
			timerStopped: 0,
			timerEnded: 0,
		});
  }

  minTwoDigits(n){
    return (n < 10 ? '0' : '') + n;
  }

  render(){
    // set display time to use at min 2 digits for all numbers
		let seconds = this.minTwoDigits(this.state.timeDisplay.seconds);
		let minutes = this.minTwoDigits(this.state.timeDisplay.minutes);
		// Set Timer State
		let timerState = this.state.timerStarted ? 'Running' :
						(this.state.timerStopped ? 'Stopped' :
						(this.state.timerEnded ? 'Ended' : 'Ready'));

    this.state.timerStarted ? '' : '';
    this.state.timerStopped ? '' : '';
		const ui = [
			<button onClick={this.handleTimerStart.bind(this)}>Start</button>,
			<button onClick={this.handleTimerStop.bind(this)}>Stop</button>,
			<button onClick={this.handleTimerReset.bind(this)}>Reset</button>
		];

    return (
      <div style={{width:"400px", height:"300px",border:"solid 1px red", borderRadius:"10px", margin: "auto", background:"gray"}}>
        <div className="timer">
				{ui}
				<hr/>
				<h2>Time</h2>
				<h3 className="time"><span>{minutes}</span>:<span>{seconds}</span></h3>
				<hr/>
				<h3>{timerState}</h3>
			</div>
      </div>
    );
  }
}

Timer.defaultProps = {
  minutes: 1,
  seconds: 30
}
