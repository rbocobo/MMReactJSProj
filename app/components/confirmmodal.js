import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class ConfirmModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            title : this.props.title,
            message : this.props.message,
            show: false,
        }
    }

    handleOKClicked(){
        this.props.confirm();
        this.state({show:false});
    }

    handleCancelClicked(){
        this.props.cancelDelete();
        this.setState({show: false});
    }

    componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps");
    this.setState({ show:nextProps.show })
    }

    render(){
        return (
        <Modal show={this.state.show} onHide={()=>this.cancel()}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.message}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={()=>this.handleOKClicked()}>OK</Button>
            <Button bsStyle="danger" onClick={()=> this.handleCancelClicked()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
        );
    }

}

ConfirmModal.propTypes = {
    title: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    show: React.PropTypes.bool.isRequired,
    confirm: React.PropTypes.func.isRequired
}
