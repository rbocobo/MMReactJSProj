import React,{ Component } from 'react';
import {Button, ButtonGroup, ButtonToolbar, Panel, Grid, Row, Col, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

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
		const ui = (
      <ButtonToolbar>
        <Button onClick={this.handleTimerStart.bind(this)} bsStyle="success">Start</Button>
        <Button onClick={this.handleTimerStop.bind(this)}  bsStyle="danger">Stop</Button>
        <Button onClick={this.handleTimerReset.bind(this)} bsStyle="primary">Reset</Button>
      </ButtonToolbar>
		);
    const timerTypeToolbar = (
      <ButtonGroup>
        <Button bsStyle="primary">Pomodoro</Button>
        <Button bsStyle="primary">Short Break</Button>
        <Button bsStyle="primary">Long Break</Button>
      </ButtonGroup>
    );

    const tooltipConfig = (<Tooltip id="tooltipConfig">Configure Timer</Tooltip>);

    const settings =[
      <OverlayTrigger placement="top" ref="overlay" overlay={tooltipConfig}><span><Glyphicon glyph="cog"/></span></OverlayTrigger>
    ];

    return (

        <Panel style={{width:"430px"}} header={timerTypeToolbar} bsStyle="success" footer={settings}>
        <Grid style={{width:"400px"}}>
          <Row>
            <Col md={8} mdOffset={2}>
              <div style={{textAlign:"center",fontSize:"60px", fontFamily:"Sarpanch, sans-serif"}}>
                <span>{minutes}</span>:<span>{seconds}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={8} mdOffset={3}>
              {ui}
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>{timerState}</h6>
            </Col>
          </Row>
        </Grid>
        </Panel>

    );
  }
}

Timer.defaultProps = {
  minutes: 1,
  seconds: 30
}
