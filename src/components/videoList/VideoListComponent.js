import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ConfirmationComponent from '../common/ConfirmationComponent';
import { fetchVideoList, playVideoFromList, editVideoFromList, deleteVideoFromList,
    openEditVideo } from '../../actions/videoListActions';
import ItemsCarousel from 'react-items-carousel';
import PropTypes from 'prop-types';

class VideoList extends Component {

    constructor(props){
        super(props);
        this.playVideo = this.playVideo.bind(this);
    }
    
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.newVideo) {
            this.props.listVideos.splice(1, 0, nextProps.newVideo);
        }
        this.setChildrens();
    }

    componentWillMount() {
        this.props.fetchVideoList();
        this.setState({
          children: [],
          activeItemIndex: 0,
          tooltipOpen: false,
          videoToDelete: {},
          openDeleteConfirmation: false,
          activeVideo: 0
        });
        this.setChildrens();
    }

    setTimeFormat = (sTime) => {
        let min, sec = '';
        if(sTime){
            min = (Math.floor(+sTime / 60)).toString();
            min = min.length > 1 ? min : `0${min}`;
            sec = +sTime < 60 ? sTime.toString() : (Math.floor(+sTime % 60)).toString();
            sec = sec.length > 1 ? sec : `0${sec}`;
        }
        return `${min}:${sec}`;
    }

    setChildrens = () => { 
        setTimeout(() => {
            this.setState((prevState) => ({...prevState, children: this.createChildren() }));
        }, 10);
    }

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

    playVideo = (video, e) => {
        const items =  document.getElementsByClassName("active-video");
        if (items.length) { items[0].classList.remove("active-video") };
        e.currentTarget.classList.add('active-video');
        this.props.playVideoFromList(video);
    }

    answerConfirmation = (answer) => {
        if (answer){
            this.props.deleteVideoFromList(this.state.videoToDelete);
        } 
        this.setState((prevState) => ({
            ...prevState,
            videoToDelete: {},
            openDeleteConfirmation: false }));
    }

    openDeleteConfirmation = (video) => {
        this.setState((prevState) => ({...prevState,
            openDeleteConfirmation: true,
            videoToDelete: video
        }));
    }

    openEditVideo = (video) => {
        this.props.openEditVideo(video);
    }
    
    createChildren = () => (
        this.props.listVideos.map((val, i) => (
            <div key={i} className="video-list-item text-center">
                <strong id="itemName" className="itemName">{val.name}</strong>
                
                <div className="row pt-2">
                    <div className="col-6">
                        <span className="time-label float-left">start:</span>
                    </div>
                    <div className="col-6">
                        <span className="float-left">{this.setTimeFormat(val.start)}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <span className="time-label float-left">end:</span>
                    </div>
                    <div className="col-6">
                        <span className="float-left">{this.setTimeFormat(val.end)}</span>
                    </div>
                </div>

                <div className="w-100 button-actions-container"> 
                    {i !== 0 ? (
                        <i className="fa fa-edit fa-2x edit-icons"
                            onClick={() => this.openEditVideo(val)}></i>
                    ) : null }

                    <i className="fa fa-play-circle fa-5x btn-play"
                        onClick={(e) => this.playVideo(val, e)}></i>

                    {i !== 0 ? (
                        <i className="fa fa-trash fa-2x delete-icons"
                            onClick={() => this.openDeleteConfirmation(val)}></i>
                    ) : null }
                </div>
            </div>
        ))
    );
    
    render() {
        const {
          activeItemIndex,
          children,
        } = this.state;
    
        return (
            <Fragment>
                <ItemsCarousel
                    // Carousel configurations
                    numberOfCards={6}
                    gutter={12}
                    showSlither={true}
                    firstAndLastGutter={true}
            
                    // Active item configurations
                    requestToChangeActive={this.changeActiveItem}
                    activeItemIndex={activeItemIndex}
                    activePosition={'center'}
                    // Chevron configuration
                    chevronWidth={50}
                    rightChevron={'>'}
                    leftChevron={'<'}
                    outsideChevron={false}
                >
                    {children}
                </ItemsCarousel>
                <ConfirmationComponent 
                    title='Alert'
                    message='¿Are you sure you want to delete this video from the list?'
                    answerConfirmation={this.answerConfirmation}
                    isOpen={this.state.openDeleteConfirmation}
                />
            </Fragment>
        );
    }
}

VideoList.propTypes = {
    fetchVideoList: PropTypes.func.isRequired,
    listVideos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        start: PropTypes.string,
        end: PropTypes.string,
    })),
    newVideo: PropTypes.shape({
        name: PropTypes.string,
        start: PropTypes.string,
        end: PropTypes.string,
    })
}

const mapStateToProps = state => ({
    listVideos: state.videoList.listVideos,
    newVideo: state.videoList.newVideo,
});
  
const mapDispachToProps = {
    fetchVideoList,
    playVideoFromList,
    editVideoFromList,
    deleteVideoFromList,
    openEditVideo
};

export default connect(mapStateToProps, mapDispachToProps)(VideoList);