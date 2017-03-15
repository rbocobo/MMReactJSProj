import React,  {Component} from 'react';
import {Grid, Col, Row, Panel, Tabs, Tab} from 'react-bootstrap';
import Hero from './hero';
import Section from './section';
import CardList from './cardlist';
import Timer from "./timer";
import TimerConfig from "./timerconfig";
import TaskStore from "../stores/taskStore";
import TaskTable from "./TaskTable";
import Notifications, {notify} from 'react-notify-toast';

export default class Content extends Component{
    constructor(){
      super()
      this.state={
        minutes:24,
        seconds:0,
        tasks: TaskStore.getIncompleteTasks(),
        config:{
          pomodoro:{minutes:30,seconds:0},
          shortbreak:{minutes:2,seconds:45},
          longbreak:{minutes:4,seconds:45},
        },
      }

      this.getTasks = this.getTasks.bind(this);
    }

    handleOnConfigChanged(e){
      console.log(e);
      this.setState({
        config: e.config
      },()=>{
        switch(e.currentTimer){
          case "pomodoro":
            this.handleOnPomodoroClick();
            break;
          case "shortbreak":
            this.handleOnShortBreakClick();
            break;
          case "longbreak":
            this.handleOnLongBreakClick();
            break;
        }
      });

    }
    handleOnShortBreakClick(){
      this.setState({
        minutes:this.state.config.shortbreak.minutes,
        seconds:this.state.config.shortbreak.seconds
      });
    }

    handleOnLongBreakClick(){
      this.setState({
        minutes:this.state.config.longbreak.minutes,
        seconds:this.state.config.longbreak.seconds
      });
    }

    handleOnPomodoroClick(){
      this.setState({
        minutes:this.state.config.pomodoro.minutes,
        seconds:this.state.config.pomodoro.seconds
      });
    }

    getTasks(){
      this.setState({tasks: TaskStore.getIncompleteTasks()});
    }
    componentWillMount(){
        TaskStore.on("change", this.getTasks );

    }

    componentWillUnmount(){
      TaskStore.removeListener("change", this.getTasks );
    }

    render(){
        let cardData = [
            {
                title: "Card 1",
                content: "Content1"
            },
            {
                title: "Card 2",
                content: "Content2"
            },
            {
                title: "Card 3",
                content: "Content3"
            },
        ];
        return(
                <div>

                <Grid fluid>
                    <Row>
                        <Col md={6}>

                        </Col>
                    </Row>
                    <Row>
                      <Col mdOffset={1} md={3}>
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                          <Tab eventKey={1} title="Timer">
                            <Timer
                              tasks={this.state.tasks}
                              minutes={this.state.minutes}
                              seconds={this.state.seconds}
                              onShortBreakClick={this.handleOnShortBreakClick.bind(this)}
                              onLongBreakClick={this.handleOnLongBreakClick.bind(this)}
                              onPomodoroClick={this.handleOnPomodoroClick.bind(this)}
                              onConfigChanged={(e)=>this.handleOnConfigChanged(e)}
                            />
                          </Tab>
                          <Tab eventKey={2} title="Configure Timer">
                            <TimerConfig/>
                          </Tab>
                        </Tabs>

                      </Col>
                      <Col md={8}>
                        <TaskTable view="incomplete" viewMode={true}></TaskTable>
                      </Col>
                    </Row>
                </Grid>



                </div>


        )
    }
}
