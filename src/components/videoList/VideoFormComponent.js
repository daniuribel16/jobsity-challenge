import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveVideoToList } from '../../actions/videoListActions';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';

class VideoForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            video: {
                name: "",
                start: 0,
                end: 0
            },
            modal: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.addNewVideoToList = this.addNewVideoToList.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    onInputChange = (e) => {
        this.setState({
            ...this.state,
            video: {...this.state.video,
                [e.target.name]: e.target.value 
            }
        });
    }

    addNewVideoToList = () => {
        this.props.saveVideoToList(this.state.video);
    }

    render = () => {
        return (
            <div>
                <Button color="danger" className="btn-open-form btn-lg rounded-circle" onClick={this.toggle}>
                    <i className="fa fa-plus"></i>
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader className="modal-form-header" toggle={this.toggle}>Create video</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    onChange={this.onInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="start">Start</Label>
                                <Input
                                    type="number"
                                    id="start"
                                    name="start"
                                    placeholder="Start Time"
                                    onChange={this.onInputChange}
                                />
                                <FormText>Time in seconds where you want the new video starts.</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="end">End</Label>
                                <Input
                                    type="number"
                                    id="end"
                                    name="end"
                                    placeholder="End Time"
                                    onChange={this.onInputChange}
                                />
                                <FormText>Time in seconds where you want the new video finishes.</FormText>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-outline-primary" onClick={this.toggle}>Cancel</Button>
                        <Button className="btn btn-outline-danger" onClick={this.addNewVideoToList}>Create</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

const mapDispachToProps = {
    saveVideoToList
};

export default connect(null, mapDispachToProps)(VideoForm);