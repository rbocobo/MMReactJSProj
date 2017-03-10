import dispatcher from "../dispatcher";
import TimerActionConstants from "./timerActionConstants";

export function  startTimer(clock){
  dispatcher.dispatch({
    type: ACTION_TIMERSTART: "ACTION_TIMERSTART",
    clock
  });
}

export function stopTimer(){
  dispatcher.dispatch({
    type: ACTION_TIMERSTART: "ACTION_TIMERSTOP"
  });
}

export function  resetTimer(){
  dispatcher.dispatch({
    type: ACTION_TIMERSTART: "ACTION_TIMERRESET"
  });
}
