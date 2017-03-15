import dispatcher from "../dispatcher";
import TimerActionConstants from "./timerActionConstants";

export function  startTimer(clock){
  dispatcher.dispatch({
    type: TimerActionConstants.ACTION_TIMERSTART,
    clock
  });
}

export function stopTimer(){
  dispatcher.dispatch({
    type: TimerActionConstants.ACTION_TIMERSTOP
  });
}

export function  resetTimer(){
  dispatcher.dispatch({
    type: TimerActionConstants.ACTION_TIMERRESET
  });
}

export function  addTimerConfig(config){
  dispatcher.dispatch({
    type: TimerActionConstants.ACTION_ADDCONFIG,
    config
  });
}
