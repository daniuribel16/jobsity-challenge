import '../../assets/css/video-player.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setOriginalVideoToList, playVideoFromList } from '../../actions/videoListActions';
import VideoMarkers from './VideoMarkersComponent';
import PropTypes from 'prop-types';

class VideoPlayer extends Component {
    constructor(props) { 
        super(props);// bind keys events
        document.onkeydown = e => this.onKeyDown(e)
        document.onkeyup = e => this.onKeyUp(e)
    }
    //set inital class variables
    actualVideo = null;// defaul url, change it to see another video 
    defaulUrl = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4'; 
    keysPressed = [];
    state = { // set initial state
        currentSrc: this.defaulUrl,
        videoSet: false,
        isTransition: false,
        showLoader: true,
        showMarkers: false
    }

    componentDidMount = () => {
        // after player did mount set the needed events to it
        this.actualVideo.volume = 0;
        this.actualVideo.ondurationchange = e => {
            if (!this.state.videoSet) { // when get original video duration, add this one to the list
                this.props.setOriginalVideoToList({
                    id: 1,
                    name: 'Original',
                    path: this.defaulUrl,
                    start: '0',
                    end: (Math.floor(e.currentTarget.duration)).toString(),
                    tags: []
                })
                this.setState((prevState) =>({...prevState, videoSet: true}));
            }
        };

        this.actualVideo.onpause = e => { // when video finish a clip call the next video on list
            if([Math.floor(e.currentTarget.currentTime),Math.floor(e.currentTarget.currentTime + 1)].indexOf(+this.props.currentVideo.end) !== -1) {
                this.showHideLoader(true);
                setTimeout(() => { // it's called after 3 seconds
                    const currentList = this.props.filteredList.length ? this.props.filteredList : this.props.listVideos;
                    let nextVideo = {};
                    if (!currentList) { // if there is no more videos set the original
                        nextVideo = this.props.originalVideo;
                    } else { 
                        const videoIndex = currentList.map(x => x.id).indexOf(this.props.currentVideo.id);
                        // if it's the last one in the list then set the first (original)
                        if (videoIndex === (currentList.length -1)) { 
                            nextVideo = this.props.originalVideo;
                        } else { // else set the next one on list
                            nextVideo = currentList[videoIndex + 1];
                        }
                    } // play the video defined
                    this.props.playVideoFromList(nextVideo);
                    this.setState((prevState) => ({...prevState, isTransition: true}));
                }, 3000);
            }
        }

        this.actualVideo.onseeked = e => { // verify if the seeked duration is in the actual clip range
            if(!this.state.isTransition) {
                if(Object.keys(this.props.currentVideo).length > 0) {
                    if (Math.ceil(e.target.currentTime) < +this.props.currentVideo.start ||
                        Math.floor(e.target.currentTime) > +this.props.currentVideo.end) {
                            const newVideoSrc = `${this.defaulUrl}#t=${this.props.currentVideo.start},${this.props.currentVideo.end}`;
                            this.actualVideo.src = newVideoSrc;  // otherwise will begin from its true start time
                    }
                }
            } else { 
                this.setState((prevState) => ({...prevState, isTransition: false}));
            }
        };
        
        this.actualVideo.onplaying = e => this.showHideLoader(false); // hide loader when is already playing

        this.actualVideo.onwaiting = e => this.showHideLoader(true); // show loading when video is wating
    }

    onKeyDown = e => { // save and check if the pressed keys correspond with command to play next or previos clip
        let comm = ''
        this.keysPressed.push(e.keyCode)
        if (this.keysPressed.indexOf(81) !== -1 && this.keysPressed.indexOf(39) !== -1) { comm = 'R'; }
        else if (this.keysPressed.indexOf(81) !== -1 && this.keysPressed.indexOf(37) !== -1) { comm = 'L'; }
        if (comm) { this.playNextPreviousVideo(comm); }
    }

    onKeyUp = e => { // remove the pressed key to validate command
        let i = this.keysPressed.indexOf(e.keyCode);
        if (i !== -1) { this.keysPressed.splice(i, 1); }
        this.keysPressed = this.keysPressed.filter(x => x === 81 || x === 39 || x === 37);
    }

    showHideLoader = show => { // show or hide loader
        this.setState(this.setState((prevState) => ({...prevState, showLoader: show})));
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.currentVideo) { // set the new clip depending of current video state
            const newVideoSrc = `${this.defaulUrl}#t=${nextProps.currentVideo.start},${nextProps.currentVideo.end}`;
            this.actualVideo.src = newVideoSrc; // and change video source
        }
    }

    playNextPreviousVideo = action => { // it'll set the new clip according to command right or left pressed
        const currentList = this.props.filteredList.length ? this.props.filteredList : this.props.listVideos;
        let nextVideo = {};
        if (!currentList) { // if there is no clips set the original
            nextVideo = this.props.originalVideo;
        } else { // otherwise check if the next index is out of list range and take the desition
            let videoIndex = currentList.map(x => x.id).indexOf(this.props.currentVideo.id);
            if ((videoIndex === (currentList.length - 1) && action === 'R') ||
                (videoIndex === 0 && action === 'L')) {
                nextVideo = this.props.originalVideo;
            } else {
                nextVideo = action === 'R' ? currentList[videoIndex + 1] : currentList[videoIndex - 1];
            }
        } // then play video found
        this.props.playVideoFromList(nextVideo); 
    }

    toggleMarkers = show => {
        setTimeout(() => { // show or hide markers depending on mouse actions
            this.setState(prevState => ({...prevState, showMarkers: show}))
        }, (show ? 100 : 400));
    }

    playVideoByMarket = video => { // play a video clicked refered to a clip
        this.props.playVideoFromList(video);
    }

    render() {
        return ( 
            <div onMouseEnter={() => this.toggleMarkers(true)}
                onMouseLeave={() => this.toggleMarkers(false)}>
                {
                    this.state.showLoader ? (
                        <div className="loading">
                            <i className="fa fa-spinner fa-spin"></i>
                        </div> 
                    ) : null
                } 
                <video // render html video 
                    ref={v => this.actualVideo = v  }
                    id="player"
                    preload="metadata"
                    className="video-player"
                    controls
                    autoPlay
                >
                    <source src={this.defaulUrl} type="video/mp4" />
                    Your browser does not support HTML5 video.
                    </video>
                { this.state.showMarkers ? (
                    <VideoMarkers // render markers
                        videoList={this.props.listVideos}
                        originalVideo={this.props.originalVideo}
                        currentVideo={this.props.currentVideo}
                        playVideoByMarket={this.playVideoByMarket}
                    /> ): null }
            </div>
            );
    }
}
// PropTypes
const videoStruct = PropTypes.shape({
    name: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
});

VideoPlayer.propTypes = {
    setOriginalVideoToList: PropTypes.func.isRequired,
    playVideoFromList: PropTypes.func.isRequired,
    listVideos: PropTypes.arrayOf(videoStruct),
    filteredList: PropTypes.arrayOf(videoStruct),
    originalVideo: videoStruct,
    currentVideo: videoStruct,
}
// map states and dispatches to props
const mapStateToProps = state => ({
    currentVideo: state.videoList.currentVideo,
    filteredList: state.videoList.filteredList,
    listVideos: state.videoList.listVideos,
    originalVideo: state.videoList.originalVideo
});

const mapDispachToProps = {
    setOriginalVideoToList,
    playVideoFromList
}
// export component connection with react - redux
export default connect(mapStateToProps, mapDispachToProps)(VideoPlayer)