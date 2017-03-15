import React,{ Component } from 'react';
import {Label, Button, ButtonGroup, ButtonToolbar, Panel, Grid, Row, Col, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import TimerStore from '../stores/timerStore';
import TimerActionConstants from '../actions/timerActionConstants';
import * as TimerActions from '../actions/timerActions';
import * as TaskActions from '../actions/taskActions';
import Select from "react-select";
import _ from "lodash";

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
			timerStopped: 0,
			timerEnded: 0,
      task:{},
      tasks: this.props.tasks,
      pomodoroStyle: "success",
      shortbreakStyle: "primary",
      longbreakStyle: "primary",
      mustPersist: true,
      currentTimer: "pomodoro"
    };

    this.getTime = this.getTime.bind(this);
    this.handleTimerEnd = this.handleTimerEnd.bind(this);
  }


  handleTimerStop() {
		console.log('Timer Stopped');
    TimerActions.stopTimer();
    if(this.state.mustPersist){
    TaskActions.updateElapsedTask({
      task: this.state.task,
      elapsed: TimerStore.getElapsed()
    });
    }
		// clearInterval(this.timer);
		// this.setState({
		// 	timerStarted: 0,
		// 	timerStopped: 1
		// });
	}

  handleTimerStart(){

    console.log('Time Started');
    TimerActions.startTimer({
      task: this.state.task,
      minutes:this.state.timeDisplay.minutes,
      seconds:this.state.timeDisplay.seconds,
      defaultMinutes: this.props.minutes,
      defaultSeconds: this.props.seconds,
      mustPersist: this.state.mustPersist
    });
    TaskActions.setInProgress(this.state.task.id);

    // if(this.state.timerEnded){
    //   this.handleTimerReset();
    //   return;
    // }
    //
    // this.setState({
    //   timerStarted:1,
    //   timerStopped:0,
    //   timerEnded:0
    // });
    //
    // let self = this;
    // let time = this.state.timeDisplay;
    //
    // this.timer = setInterval(()=>{
    //   if(time.seconds > 0){
    //     time.seconds--;
    //     this.setState({
    //       timeDisplay: time
    //     });
    //   }else if(time.seconds === 0 && time.minutes > 0){
    //     time.minutes--;
    //     time.seconds = 59;
    //     self.setState({
    //       timeDisplay:time
    //     });
    //   }else{
    //     this.handleTimerEnd();
    //   }
    // },1000);

  }

  handleTimerEnd(){
    console.log('Timer Ended');
    // clearInterval(this.timer);
    // this.setState({
    //   timerStarted: 0,
    //   timerEnded: 1
    // });
    if(this.state.mustPersist){
    TaskActions.updateElapsedTask({
       task: this.state.task,
       elapsed: TimerStore.getElapsed()
     });
   }
  }

  handleTimerReset(){
    console.log('Timer Reset');
    TimerActions.resetTimer();
    // let minutes = this.props.minutes;
    // let seconds = this.props.seconds;
    // this.setState({
		// 	timeDisplay: {
		// 		minutes: minutes,
		// 		seconds: seconds
		// 	},
		// 	timerStarted: 0,
		// 	timerStopped: 0,
		// 	timerEnded: 0,
		// });
  }

  handlePomodoroClick(){
    this.setState({mustPersist:true, currentTimer: "pomodoro", pomodoroStyle: "success", shortbreakStyle: "primary" , longbreakStyle: "primary"});
    this.props.onPomodoroClick();
  }

  handleShortBreakClick(){
    this.setState({mustPersist:true, currentTimer: "shortbreak", pomodoroStyle: "primary", shortbreakStyle: "success" , longbreakStyle: "primary"});
    this.props.onShortBreakClick();
  }

  handleLongBreakClick(){
    this.setState({mustPersist:false, currentTimer: "longbreak", pomodoroStyle: "primary", shortbreakStyle: "primary" , longbreakStyle: "success"});
    this.props.onLongBreakClick();
  }

  handleTimerComplete(){
    TaskActions.completeTask(this.state.task.id);
  }

  minTwoDigits(n){
    return (n < 10 ? '0' : '') + n;
  }

  getTime(){
    console.log("getting time");
    this.setState({
      timeDisplay: TimerStore.getTime()
    });
  }

  handleSelectChange(e){
    this.setState({
      task: this.state.tasks[_.findIndex(this.state.tasks, { id: e.value })]
    },()=>{
      this.props.onConfigChanged({config:TimerStore.getConfig(this.state.task.config), currentTimer: this.state.currentTimer});
    });

  }
  componentWillMount(){
      TimerStore.on("timerchange", this.getTime );
      TimerStore.on("timerended", this.handleTimerEnd);
  }

  componentWillUnmount(){
    TimerStore.removeListener("timerchange", this.getTime);
    TimerStore.removeListener("timerended", this.handleTimerEnd);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      tasks: nextProps.tasks,
			timeDisplay: {
				minutes: nextProps.minutes,
				seconds: nextProps.seconds
			}});
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
		const actionbuttons = (
      <ButtonToolbar>
        <Button onClick={this.handleTimerStart.bind(this)} bsStyle="success">Start</Button>
        <Button onClick={this.handleTimerStop.bind(this)}  bsStyle="danger">Stop</Button>
        <Button onClick={this.handleTimerReset.bind(this)} bsStyle="info">Reset</Button>
        <Button onClick={this.handleTimerComplete.bind(this)} bsStyle="primary">Complete</Button>
      </ButtonToolbar>
		);
    const timerTypeToolbar = (
      <ButtonGroup>
        <Button bsStyle={this.state.pomodoroStyle} onClick={this.handlePomodoroClick.bind(this)} >Pomodoro</Button>
        <Button bsStyle={this.state.shortbreakStyle} onClick={this.handleShortBreakClick.bind(this)} >Short Break</Button>
        <Button bsStyle={this.state.longbreakStyle} onClick={this.handleLongBreakClick.bind(this)} >Long Break</Button>
      </ButtonGroup>
    );

    const tooltipConfig = (<Tooltip id="tooltipConfig">Configure Timer</Tooltip>);

    const settings =(
      <OverlayTrigger placement="right" ref="overlay" overlay={tooltipConfig}><span style={{width:"100%"}}><Glyphicon glyph="cog"/></span></OverlayTrigger>
    );

    const taskOptions = this.props.tasks.map((item)=>{
      return { label: item.taskName, value: item.id }
    })

    return (
        <div>
        <Panel style={{width:"430px"}} bsStyle="success" >
        <Grid style={{width:"400px"}}>
          <Row style={{height:"60px"}}>
            <Col md={10} mdOffset={1}>
              <div>
                <Label htmlFor="tasks">Tasks:</Label>
                <Select
                name="priority"
                value={this.state.task.id}
                options={taskOptions}
                onChange={e=> this.handleSelectChange(e)}
                 />
              </div>

            </Col>
          </Row>
          <Row>
            <Col md={10} mdOffset={1}>
              {timerTypeToolbar}
            </Col>
          </Row>
          <Row>
            <Col md={8} mdOffset={2}>
              <div style={{textAlign:"center",fontSize:"60px", fontFamily:"Sarpanch, sans-serif"}}>
                <span>{minutes}</span>:<span>{seconds}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={10} mdOffset={1}>
              {actionbuttons}
            </Col>
          </Row>
          <Row>
            <Col md={10}>
              {settings}
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>{timerState}</h6>
            </Col>
          </Row>
        </Grid>
        </Panel>
        </div>
    );
  }
}

Timer.defaultProps = {
  minutes: 25,
  seconds: 0
}
