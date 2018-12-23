import '../../assets/css/video-form.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveVideoToList, editVideoFromList } from '../../actions/videoListActions';
import PropTypes from 'prop-types';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText, Alert
} from 'reactstrap';

class VideoForm extends Component {

    // initialization of state and binding functions
    constructor(props) {
        super(props)
        this.state = {
            video: { id: 0, name: '', start: '', end: '', tags: [] },
            actualTag: '',
            modal: false,
            isCreate: true,
            errorMessage: '',
            errorVisible: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.addNewVideoToList = this.addNewVideoToList.bind(this);
        this.toggle = this.toggle.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    // hook called when component will receive the props to it and set state needed
    componentWillReceiveProps = (nextProps) => { 
        if (Object.keys(nextProps.videoToEdit).length > 0) {
            this.setState((prevState) => ({
                ...prevState,
                modal: true,
                isCreate: false,
                video: {
                    id: +nextProps.videoToEdit.id,
                    name: nextProps.videoToEdit.name,
                    start: +nextProps.videoToEdit.start,
                    end: +nextProps.videoToEdit.end,
                    tags: nextProps.videoToEdit.tags
                }
            }));
        }
    }

    toggle() { // open or close create/edit modal form
        this.setState({ modal: !this.state.modal, isCreate: true, });
    }

    onInputChange = e => { // set form inputs when change their text
        this.setState({
            ...this.state,
            video: {...this.state.video,
                [e.target.name]: e.target.value 
            }
        });
    }

    onTagInputChange = e => { // set tag input when change its text
        this.setState({
            ...this.state,
            actualTag: e.target.value
        });
    }

    addTagToVideo = () => { // add a new tag to tags list on current video
        if (this.state.actualTag) {
            this.setState((prevState) => ({
                ...prevState,
                actualTag: '',
                video: {...prevState.video, 
                    tags: prevState.video.tags.concat([this.state.actualTag]) }
            }));
        }
    }

    removeTag = (e) => { // remove tag when x icon is clicked
        let newTagList = [].concat(this.state.video.tags);
        newTagList.splice(e, 1);
        this.setState((prevState) => ({
            ...prevState,
            video: {...prevState.video, tags: newTagList }
        }));
    }

    onKeyUp = (e) => { // detects enter key on form to create a new video
        if(e.keyCode === 13) {
            this.addNewVideoToList();
        }
    }

    onTagKeyUp = (e) => { // detects enter key on tags to add a new one
        if(e.keyCode === 13) {
            this.addTagToVideo();
        }
    }

    // valid all the common requiriments in a crud form
    validForm = () => {
        let isValid = true;
        for(let key in this.state.video) { // valid required fields
            if (this.state.video[key].toString() === '' && key !== 'tags') {
                this.showAlert(`field ${key} is required.`);
                isValid = false;
                break;
            }
        }

        if (isValid) { // valid end time greater than end time
            if (+this.state.video.start >= +this.state.video.end) {
                this.showAlert(`start time must greater than end time.`);
                isValid = false;
            }
        }

        if (isValid) { // valid times are in original video range time
            if (+this.state.video.start < +this.props.listVideos[0].start ||
                +this.state.video.start > +this.props.listVideos[0].end ||
                +this.state.video.end < +this.props.listVideos[0].start ||
                +this.state.video.end > +this.props.listVideos[0].end) {
                    this.showAlert(`start and end time must be within the range 
                         ${this.props.listVideos[0].start} and ${this.props.listVideos[0].end}.`)
                    isValid = false;
            }
        }
        return isValid;
    }
    
    // show alert if form is not valid
    showAlert = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            errorMessage: message,
            errorVisible: true
        }), () => { 
            setTimeout(() => {
                this.setState((prevState) => ({
                    ...prevState,
                    errorVisible: false
                }))
        }, 5000) });
    }

    // function call when click on create video button witch create a new one with the given information
    addNewVideoToList = () => {
        if (this.validForm()) {
            // if form is valid call save or update according to state
            this.state.isCreate ? 
                this.props.saveVideoToList(this.state.video) :
                this.props.editVideoFromList(this.state.video);
            this.toggle(); // clean form after action
            this.setState((prevState) => ({
                ...prevState,
                video: {...this.state.video,
                   id: 0, name: '', start: 0, end: 0, tags: []
                }
            }));
        }
    }

    render = () => {
        return (
            <div className="col-md-4 mb-2">
                {/* Render create button if it's admin view */}
                { this.props.view === '/admin' ? (
                <Button className="btn-open-form btn-lg rounded" onClick={this.toggle}>
                    <i className="fa fa-plus mr-1"></i>
                    Create new video
                </Button>) : null }
                {/* modal form with inputs needed to create new video */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader className="modal-form-header" toggle={this.toggle}>
                        {this.state.isCreate ? 'Create' : 'Edit'} video</ModalHeader>
                    <ModalBody className="p-4">
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    onChange={this.onInputChange}
                                    onKeyUp={this.onKeyUp}
                                    value={this.state.video.name}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="start">Start time</Label>
                                <Input
                                    type="number"
                                    id="start"
                                    name="start"
                                    placeholder="Start Time"
                                    onChange={this.onInputChange}
                                    onKeyUp={this.onKeyUp}
                                    value={this.state.video.start}
                                />
                                <FormText>Time in seconds where you want the new video starts.</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="end">End time</Label>
                                <Input
                                    type="number"
                                    id="end"
                                    name="end"
                                    placeholder="End Time"
                                    onChange={this.onInputChange}
                                    onKeyUp={this.onKeyUp}
                                    value={this.state.video.end}
                                />
                                <FormText>Time in seconds where you want the new video finishes.</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="tag">Add tag</Label>
                                <Input
                                    type="text"
                                    id="tag"
                                    name="tag"
                                    placeholder="tags"
                                    onChange={this.onTagInputChange}
                                    onKeyUp={this.onTagKeyUp}
                                    value={this.state.actualTag}
                                />
                                <Button className="btn btn-outline-danger btn-add-tag" onClick={this.addTagToVideo}>
                                    Add</Button>
                            </FormGroup>
                        </Form>
                        {/* tags list added by 'tag' input in order to filter video afterwards */}
                        <div className="w-100">
                            {
                                this.state.video.tags.map((val, i) => (
                                    <div className="tag-item" key={i}>
                                        {val}
                                        <span onClick={() => this.removeTag(i)}>
                                            <i className="fa fa-times fa-1 ml-1 remove-tag"></i>
                                        </span>               
                                    </div>
                                ))
                            }
                        </div>
                        <Alert color="danger" isOpen={this.state.errorVisible} toggle={this.onDismiss}>
                            {this.state.errorMessage}
                        </Alert>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-outline-danger" onClick={this.addNewVideoToList}>
                        {this.state.isCreate ? 'Create' : 'Edit'} video</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}
// Proptypes
const videoStruct = PropTypes.shape({
    name: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
});

VideoForm.propTypes = {
    saveVideoToList: PropTypes.func.isRequired,
    editVideoFromList: PropTypes.func.isRequired,
    listVideos: PropTypes.arrayOf(videoStruct),
    videoToEdit: videoStruct
}
// Maps states and dispatches to props
const mapDispachToProps = {
    saveVideoToList,
    editVideoFromList
};

const mapStateToProps = state => ({
    listVideos: state.videoList.listVideos,
    videoToEdit: state.videoList.videoToEdit
});
// export component connection with react - redux
export default connect(mapStateToProps, mapDispachToProps)(VideoForm);