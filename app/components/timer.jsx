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
      currentTimer: "pomodoro",
      startEnabled : false,
      stopEnabled : false,
      resetEnabled : false,
      completeEnabled : false,
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
    this.setState({
      startEnabled:true,
      stopEnabled: false,
      resetEnabled: true,
      completeEnabled:true,
    });
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
    this.setState({
      startEnabled:false,
      stopEnabled: true,
      resetEnabled: false,
      completeEnabled:false,
    });
  }

  handleTimerEnd(){
    console.log('Timer Ended');

  //   if(this.state.mustPersist){
  //   TaskActions.updateElapsedTask({
  //      task: this.state.task,
  //      elapsed: TimerStore.getElapsed()
  //    });
  //  }

   this.setState({
     startEnabled:true,
     stopEnabled: false,
     resetEnabled: true,
     completeEnabled:true,
   });
  }

  handleTimerReset(){
    console.log('Timer Reset');
    TimerActions.resetTimer();
    this.setState({
      startEnabled:true,
      stopEnabled: false,
      resetEnabled: false,
      completeEnabled:true,
    });
  }

  handlePomodoroClick(){
    this.setState({mustPersist:true, currentTimer: "pomodoro", pomodoroStyle: "success", shortbreakStyle: "primary" , longbreakStyle: "primary"},()=>{
      this.props.onPomodoroClick();
    });

  }

  handleShortBreakClick(){
    this.setState({mustPersist:true, currentTimer: "shortbreak", pomodoroStyle: "primary", shortbreakStyle: "success" , longbreakStyle: "primary"},()=>{
      this.props.onShortBreakClick();
    });

  }

  handleLongBreakClick(){
    console.log("timer:handleLongBreakClick");
    this.setState({mustPersist:false, currentTimer: "longbreak", pomodoroStyle: "primary", shortbreakStyle: "primary" , longbreakStyle: "success"},()=>{
      this.props.onLongBreakClick();
    });

  }

  handleTimerComplete(){
    TaskActions.completeTask(this.state.task.id);
    this.setState({
      startEnabled:false,
      stopEnabled: false,
      resetEnabled: false,
      completeEnabled:false,
    });
  }

  minTwoDigits(n){
    return (n < 10 ? '0' : '') + n;
  }

  getTime(){
    //console.log("getting time");
    this.setState({
      timeDisplay: TimerStore.getTime()
    });
  }

  handleSelectChange(e){
    this.setState({
      task: this.state.tasks[_.findIndex(this.state.tasks, { id: e.value })]
    },()=>{
      this.props.onConfigChanged({config:TimerStore.getConfig(this.state.task.config), currentTimer: this.state.currentTimer});
      this.setState({
        startEnabled:true,
        stopEnabled: false,
        resetEnabled: false,
        completeEnabled:true,
      });
    });

  }
  componentWillMount(){
      TimerStore.on("timerchange", this.getTime );
      TimerStore.on("timerended", this.handleTimerEnd);
  }

  componentDidMount(){
      const task = TimerStore.getTask();
      const timerData = TimerStore.getTimerState();
      if(timerData){
        this.setState({task},()=>{
          this.setState({
            startEnabled:!(timerData.timerStarted == 1),
            stopEnabled: (timerData.timerStarted == 1),
            resetEnabled: !(timerData.timerStarted == 1),
            completeEnabled:!(timerData.timerStarted == 1),
          });
        });
      }

  }

  componentWillUnmount(){
    TimerStore.removeListener("timerchange", this.getTime);
    TimerStore.removeListener("timerended", this.handleTimerEnd);
  }

  componentWillReceiveProps(nextProps){
    console.log("timeDisplay Changing");
    console.log(nextProps);
    this.setState({tasks: nextProps.tasks});
      if(nextProps.minutes != this.props.minutes || nextProps.seconds != this.props.seconds){
        this.setState(
          {
            timeDisplay: {
      				minutes: nextProps.minutes,
      				seconds: nextProps.seconds
      			}
          }
        );
      }
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
        <Button onClick={this.handleTimerStart.bind(this)} bsStyle="success" disabled={!this.state.startEnabled}>Start</Button>
        <Button onClick={this.handleTimerStop.bind(this)}  bsStyle="danger" disabled={!this.state.stopEnabled}>Stop</Button>
        <Button onClick={this.handleTimerReset.bind(this)} bsStyle="info" disabled={!this.state.resetEnabled}>Reset</Button>
        <Button onClick={this.handleTimerComplete.bind(this)} bsStyle="primary" disabled={!this.state.completeEnabled}>Complete</Button>
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
        <Panel style={{width:"100%"}} bsStyle="success" className="pull-right">
        <Grid style={{width:"400px"}} className="pull-right">
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
