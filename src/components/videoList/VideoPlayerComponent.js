import '../../assets/css/video-player.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setOriginalVideoToList, playVideoFromList } from '../../actions/videoListActions';
import VideoMarkers from './VideoMarkersComponent';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        document.onkeydown = e => this.onKeyDown(e)
        document.onkeyup = e => this.onKeyUp(e)
    }

    actualVideo = null;
    defaulUrl = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';
    keysPressed = [];

    state = {
        currentSrc: this.defaulUrl,
        videoSet: false,
        isTransition: false,
        showLoader: true,
        showMarkers: false
    }

    componentDidMount = () => {

        this.actualVideo.volume = 0;
        this.actualVideo.ondurationchange = e => {
            if (!this.state.videoSet) {
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

        this.actualVideo.onpause = e => {
            if([Math.floor(e.currentTarget.currentTime),Math.floor(e.currentTarget.currentTime + 1)].indexOf(+this.props.currentVideo.end) !== -1) {
                this.showHideLoader(true);
                setTimeout(() => {
                    const currentList = this.props.filteredList.length ? this.props.filteredList : this.props.listVideos;
                    let nextVideo = {};
                    if (!currentList) {
                        nextVideo = this.props.originalVideo;
                    } else {
                        const videoIndex = currentList.map(x => x.id).indexOf(this.props.currentVideo.id);
                        if (videoIndex === (currentList.length -1)) {
                            nextVideo = this.props.originalVideo;
                        } else {
                            nextVideo = currentList[videoIndex + 1];
                        }
                    }
                    this.props.playVideoFromList(nextVideo);
                    this.setState((prevState) => ({...prevState, isTransition: true}));
                }, 3000);
            }
        }

        this.actualVideo.onseeked = e => {
            if(!this.state.isTransition) {
                if(Object.keys(this.props.currentVideo).length > 0) {
                    if (Math.ceil(e.target.currentTime) < +this.props.currentVideo.start ||
                        Math.floor(e.target.currentTime) > +this.props.currentVideo.end) {
                            const newVideoSrc = `${this.defaulUrl}#t=${this.props.currentVideo.start},${this.props.currentVideo.end}`;
                            this.actualVideo.src = newVideoSrc;  
                    }
                }
            } else {
                this.setState((prevState) => ({...prevState, isTransition: false}));
            }
        };
        
        this.actualVideo.onplaying = e => this.showHideLoader(false);

        this.actualVideo.onwaiting = e => this.showHideLoader(true);
    }

    onKeyDown = e => {
        let comm = ''
        this.keysPressed.push(e.keyCode)
        if (this.keysPressed.indexOf(81) !== -1 && this.keysPressed.indexOf(39) !== -1) { comm = 'R'; }
        else if (this.keysPressed.indexOf(81) !== -1 && this.keysPressed.indexOf(37) !== -1) { comm = 'L'; }
        if (comm) { this.playNextPreviousVideo(comm); }
    }

    onKeyUp = e => {
        let i = this.keysPressed.indexOf(e.keyCode);
        if (i !== -1) { this.keysPressed.splice(i, 1); }
        this.keysPressed = this.keysPressed.filter(x => x === 81 || x === 39 || x === 37);
    }

    showHideLoader = show => {
        this.setState(this.setState((prevState) => ({...prevState, showLoader: show})));
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.currentVideo) {
            const newVideoSrc = `${this.defaulUrl}#t=${nextProps.currentVideo.start},${nextProps.currentVideo.end}`;
            this.actualVideo.src = newVideoSrc;
        }
    }

    playNextPreviousVideo = action => {
        const currentList = this.props.filteredList.length ? this.props.filteredList : this.props.listVideos;
        let nextVideo = {};
        if (!currentList) {
            nextVideo = this.props.originalVideo;
        } else {
            let videoIndex = currentList.map(x => x.id).indexOf(this.props.currentVideo.id);
            if ((videoIndex === (currentList.length - 1) && action === 'R') ||
                (videoIndex === 0 && action === 'L')) {
                nextVideo = this.props.originalVideo;
            } else {
                nextVideo = action === 'R' ? currentList[videoIndex + 1] : currentList[videoIndex - 1];
            }
        }
        this.props.playVideoFromList(nextVideo);
    }

    toggleMarkers = show => {
        setTimeout(() => {
            this.setState(prevState => ({...prevState, showMarkers: show}))
        }, (show ? 100 : 400));
    }

    playVideoByMarket = video => {
        this.props.playVideoFromList(video);
    }

    render() {
        return (
            <div onMouseEnter={() => this.toggleMarkers(true)}
                onMouseLeave={() => this.toggleMarkers(false)}>
                {
                    this.state.showLoader ? (
                        <div className="loading">
                            <i class="fa fa-spinner fa-spin"></i>
                        </div> 
                    ) : null
                }
                <video
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
                    <VideoMarkers 
                        videoList={this.props.listVideos}
                        originalVideo={this.props.originalVideo}
                        currentVideo={this.props.currentVideo}
                        playVideoByMarket={this.playVideoByMarket}
                    /> ): null }
            </div>
            );
    }
}

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

export default connect(mapStateToProps, mapDispachToProps)(VideoPlayer)