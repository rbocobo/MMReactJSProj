import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import _ from "lodash";
import TimerActionConstants from "../actions/timerActionConstants";

class TimerStore extends EventEmitter {
  constructor() {
    super();
    this.timerData = {
      minutes:0,
      seconds:0
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
    }
  }

}

const timerStore = new TaskStore();
timerStore.dispatchToken = dispatcher.register(timerStore.handleAction.bind(timerStore));

export default timerStore;
