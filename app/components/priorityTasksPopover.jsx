import React from "react";
import { Popover, OverlayTrigger, NavItem, Panel, Badge } from "react-bootstrap";

const PriorityTasksPopover = (props) => {
      const popoverPriorityTask = (
        <Popover id="popover-positioned-bottom" title="Popover bottom" style={{height:"500px", width:"250px"}}>
          <div style={{height:"450px", overflow:"scroll"}}>
            {props.data.map((task)=>{
              return(
                <Panel key={task.id}>
                  <div>{task.taskName}</div>
                  <small>{task.taskDescription}</small>
                </Panel>
              )
            })}
          </div>
        </Popover>
      );
      return (

        <OverlayTrigger trigger="click" placement="bottom"  overlay={popoverPriorityTask}>
          <NavItem>Priority Tasks <Badge>{props.data.length}</Badge></NavItem>
        </OverlayTrigger>
      );

}

export default PriorityTasksPopover;
