import dispatcher from "../dispatcher";
import TaskActionConstants from "./taskActionConstants";

export function  createTask(task){
  dispatcher.dispatch({
    type: TaskActionConstants.ACTION_ADD,
    task
  });
}


export function editTask(task){
  dispatcher.dispatch({
    type: TaskActionConstants.ACTION_EDIT,
    task
  });
}

export function  deleteTask(id){
  dispatcher.dispatch({
    type: TaskActionConstants.ACTION_DELETE,
    id
  });
}

export function  reloadTask(){
  dispatcher.dispatch({
    type: TaskActionConstants.ACTION_RELOAD
  });
}
