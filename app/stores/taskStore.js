import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import _ from "lodash";
import TaskActionConstants from "../actions/taskActionConstants";

class TaskStore extends EventEmitter{
  constructor(){
    super();
    this.taskMasterList = [{
      "id":1,
    	"taskName": "1 Watch Cable TV",
    	"taskDescription": "Australian Open 2017",
    	"priority": "Medium",
    	"status": "In Progress"
    }, {
      "id":2,
    	"taskName": "2 Finish Assignment ",
    	"taskDescription": "Magenic Masters Assignment 2",
    	"priority": "Medium",
    	"status": "In Progress"
    }, {
      "id":3,
    	"taskName": "3 Itaque earum rerum hic tenetur a sapiente delectus ",
    	"taskDescription": "nisi ut aliquid ex ea commodi consequatur",
    	"priority": "High",
    	"status": "In Progress"
    }
    , {
      "id":4,
    	"taskName": "4 Temporibus autem quibusdam et aut officiis ",
    	"taskDescription": "Neque porro quisquam est",
    	"priority": "Low",
    	"status": "Done"
    }
    , {
      "id":5,
    	"taskName": "5 Quis autem vel eum iure reprehenderit ",
    	"taskDescription": "vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
    	"priority": "High",
    	"status": "Done"
    }
    , {
      "id":6,
    	"taskName": "6 Et harum quidem rerum facilis est et expedita distinctio ",
    	"taskDescription": "Nam libero tempore",
    	"priority": "Low",
    	"status": "Done"
    }
    , {
      "id":7,
    	"taskName": "7 de Finibus Bonorum et Malorum",
    	"taskDescription": "At vero eos et accusamus et iusto",
    	"priority": "High",
    	"status": "In Progress"
    }
    , {
      "id":8,
    	"taskName": "8 Sed ut perspiciatis unde omnis iste natus error sit voluptatem ",
    	"taskDescription": "accusantium doloremque laudantium",
    	"priority": "Medium",
    	"status": "To do"
    }
    , {
      "id":9,
    	"taskName": "9 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    	"taskDescription": "Ut enim ad minim veniam",
    	"priority": "High",
    	"status": "Done"
    }
    , {
      "id":10,
    	"taskName": "10 Lorem ipsum dolor sit amet ",
    	"taskDescription": "consectetur adipiscing elit",
    	"priority": "High",
    	"status": "To do"
    }, {
      "id":11,
    	"taskName": "11 Task 11 ",
    	"taskDescription": "consectetur adipiscing elit",
    	"priority": "High",
    	"status": "To do"
    }
  ];

  }
  createTask(task){
    task.id = _.random(_.now());
    const index = _.findIndex(this.taskMasterList,{ id: task.id});
    if(!index || index < 0){
    this.taskMasterList.push(task);
    }
    console.log(this.taskMasterList);
    this.emit("change");
  }

  editTask(task){
    const index = _.findIndex(this.taskMasterList,{ id: task.id});
    this.taskMasterList[index] = task;

    this.emit("change");
  }

  deleteTask(id){
    console.log("taskStore:deleteTask")
    _.remove(this.taskMasterList, (i)=>{ return i.id == id; });
    this.emit("change");
  }

  getAll(){
    return this.taskMasterList;

  }

  handleAction(action){
    console.log("taskStore:handleAction");
    switch (action.type) {
      case TaskActionConstants.ACTION_ADD:
        this.createTask(action.task);
        break;
      case TaskActionConstants.ACTION_EDIT:
        this.editTask(action.task);
        break;
      case TaskActionConstants.ACTION_DELETE:
        this.deleteTask(action.id);
        break;
    }
  }
}

const taskStore = new TaskStore();
taskStore.dispatchToken = dispatcher.register(taskStore.handleAction.bind(taskStore));

export default taskStore;
