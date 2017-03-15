import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import _ from "lodash";
import TimerActionConstants from "../actions/timerActionConstants";
import * as TaskActions from "../actions/taskActions";
import TaskStore from './timerStore';

let timer = '';
class TimerStore extends EventEmitter {
  constructor() {
    super();

    this.timeDisplay = {
      minutes: 0,
      seconds: 0
    };

    this.default = {
      minutes: 0,
      seconds: 0
    };

    this.timerData = {
			timerStarted: 0,
			timerStopped: 0,
			timerEnded: 0,
    };

    this.taskInProgress = {};

    this.secondsElapsed = 0;
    this.mustPersist = true;
    this.elapsed = {
      minutes:0,
      seconds: 0
    }

    this.configData = [
      {
        id: 0,
        name: "default",
        pomodoro:{ minutes: 20, seconds: 0 },
        shortbreak:{ minutes: 2, seconds: 30 },
        longbreak:{ minutes: 5, seconds: 0 },
      },
      {
        id: 1,
        name: "Main",
        pomodoro:{ minutes: 1, seconds: 0 },
        shortbreak:{ minutes: 0, seconds: 15 },
        longbreak:{ minutes: 0, seconds: 30 },
      }
    ];
  }

  start(clock){
    console.log('Store Time Started');
    this.secondsElapsed = 0;
    this.mustPersist = clock.mustPersist;
    this.taskInProgress = clock.task;

    this.timeDisplay = {
      minutes : clock.minutes,
      seconds : clock.seconds
    }

    this.default = {
      minutes : clock.defaultMinutes,
      seconds : clock.defaultSeconds
    }

    if(this.timerData.timerEnded){
      this.reset();
      return;
    }

    this.timerData = {
      timerStarted:1,
      timerStopped:0,
      timerEnded:0
    };

    let self = this;
    let time = this.timeDisplay;

    this.timer = setInterval(()=>{
      if(time.seconds > 0){
        time.seconds--;
        this.timeDisplay = time;
        console.log(this.timeDisplay);
      }else if(time.seconds === 0 && time.minutes > 0){
        time.minutes--;
        time.seconds = 59;
        self.timeDisplay = time;
        console.log(this.timeDisplay);
      }else{
        this.end();
      }
      console.log("emitting timerchange");
      this.emit("timerchange");
      this.secondsElapsed++;
    },1000);

  }

    getTime(){
      return this.timeDisplay;
    }

    end(){
      console.log('Timer Ended');
      clearInterval(this.timer);
      this.timerData = {
        timerStarted: 0,
        timerEnded: 1,
        timerStopped: this.timerData.timerStopped
      };
      // if(this.mustPersist){
      // TaskActions.updateElapsedTask({
      //   task: this.taskInProgress,
      //   elapsed: this.getElapsed()
      // });
      // }
      this.emit("timerended");
    }

    stop(){
      clearInterval(this.timer);
      this.timerData.timerStarted = 0;
      this.timerData.timerStopped = 1;
      console.log(this.getElapsed());
      //this.secondsElapsed = 0;
    }

    reset(){
    console.log('Timer Reset');
    let minutes = this.default.minutes;
    let seconds = this.default.seconds;

		  this.timeDisplay = {
				minutes: minutes,
				seconds: seconds
			};

      this.timerData = {
			timerStarted: 0,
			timerStopped: 0,
			timerEnded: 0,
		  };
      this.emit("timerchange");
  }

  addConfig(config){
    config.id = _.random(_.now());
    this.configData.push(config);
    this.emit("change");
  }

  getConfigs(){
    return this.configData;
  }

  getConfig(id){
    const index = _.findIndex(this.configData, {id});
    return this.configData[index];
  }

  getElapsed(){
    let minutes = Math.floor(this.secondsElapsed / 60);
    let seconds = this.secondsElapsed - (minutes * 60);
    return {
      minutes,
      seconds
    };

  }

  handleAction(action){
    console.log("timerStore:handleAction");
    switch (action.type) {
      case TimerActionConstants.ACTION_TIMERSTART:
        this.start(action.clock);
        break;
      case TimerActionConstants.ACTION_TIMERSTOP:
        this.stop();
        break;
      case TimerActionConstants.ACTION_TIMERRESET:
        this.reset();
        break;
      case TimerActionConstants.ACTION_ADDCONFIG:
        this.addConfig(action.config)
        break;
    }
  }

}

const timerStore = new TimerStore();
timerStore.dispatchToken = dispatcher.register(timerStore.handleAction.bind(timerStore));

export default timerStore;
