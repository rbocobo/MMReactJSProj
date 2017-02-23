import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import _ from "lodash";
import TaskActionConstants from "../actions/taskActionConstants";
import TaskStore from "./taskStore";

class PriorityTaskStore extends EventEmitter{
  constructor(){
    super();
    this.prioritytaskMasterList = _.filter(TaskStore.getAll(), { priority: "High"});
    console.log(this.prioritytaskMasterList);
  }

  getAll(){
    return this.prioritytaskMasterList;

  }

  refreshList(){
    dispatcher.waitFor([TaskStore.dispatchToken]);
    console.log("PriorityTaskStore:refreshList");
    this.tempList = TaskStore.getAll();
    this.prioritytaskMasterList = _.filter(TaskStore.getAll(), { priority: "High"});
    this.emit("change");
  }

  handleAction(action){
    console.log("priorityTaskStore:handleAction");
    switch (action.type) {
      case TaskActionConstants.ACTION_ADD:
      case TaskActionConstants.ACTION_EDIT:
      case TaskActionConstants.ACTION_DELETE:{
        this.refreshList();
        break;
      }
      default:
        this.getAll();

    }
  }
}

const priorityTaskStore = new PriorityTaskStore();
dispatcher.register(priorityTaskStore.handleAction.bind(priorityTaskStore));
//TaskStore.dispatchToken = dispatcher.register(TaskStore.handleAction.bind(TaskStore));
export default priorityTaskStore;
