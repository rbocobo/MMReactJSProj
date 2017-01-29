import React from "react";


const TaskTableRow = (props) =>{
  return(
    <tr key={props.data.id}>
    <td>
      <div>{props.data.TaskName}</div>
      <div><small>{props.data.TaskDescription}</small></div>
    </td>
    <td>{props.data.Priority}</td>
    <td>{props.data.Status}</td>
    <td></td>
    </tr>
  )
}

export default TaskTableRow;
