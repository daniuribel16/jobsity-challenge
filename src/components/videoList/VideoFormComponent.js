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
                <Button color="danger" onClick={this.toggle}>New</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
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
                        <Button color="primary" onClick={this.addNewVideoToList}>Do Something</Button>{' '}
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
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