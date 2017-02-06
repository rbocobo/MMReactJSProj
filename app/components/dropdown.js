import React, { Component } from "react";
import Select from "react-select";

export default class DropDown extends Component{
  constructor(props){
    super(props);

    let options = [];
    if(this.props.type == "priority"){
      options = [
        {label: "High",value: "High"},
        {label: "Medium",value: "Medium"},
        {label: "Low",value: "Low"}
      ]
    }
    else {
      options = [
        {label: "To Do", value:"To Do"},
        {label: "In Progress", value:"In Progress"},
        {label: "Done", value:"Done"},
      ]
    }

    this.state = {
      selectedValue : "",
      selectList : options
    }

  }
  handleSelectChange(e){
    this.setState({selectedValue : e.value});
    this.props.selected({value:e.value, type: this.props.type});
  }
  render(){
    return(
      <Select
      name="priority"
      value={this.state.selectedValue}
      options={this.state.selectList}
      onChange={e=> this.handleSelectChange(e)}
       />
    );
  }
}
DropDown.propTypes = {
  type : React.PropTypes.string.isRequired,
  selected : React.PropTypes.func.isRequired
}
