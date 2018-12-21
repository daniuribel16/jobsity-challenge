import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmationComponent extends Component {
    constructor(props){
        super(props)
        this.state = { modal: false };
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({ modal: false });
    }

    render = () => {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.close} className={this.props.className}>
                <ModalHeader className="modal-form-header" toggle={() => this.props.answerConfirmation(false)}>{this.props.title}</ModalHeader>
                <ModalBody className="p-4">
                    <h5>{this.props.message}</h5>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-outline-danger" onClick={() => this.props.answerConfirmation(true)}>Aceptar</Button>
                    <Button className="btn btn-outline-primary" onClick={() => this.props.answerConfirmation(false)}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ConfirmationComponent.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    answerConfirmation: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
}

export default ConfirmationComponent;