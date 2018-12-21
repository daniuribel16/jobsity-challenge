import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setOriginalVideoToList } from '../../actions/videoListActions';

class VideoPlayer extends Component {
    actualVideo = null;
    defaulUrl = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';

    state = {
        currentSrc: this.defaulUrl,
        videoSet: false
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
                    end: (Math.floor(e.currentTarget.duration)).toString()
                })
                this.setState((prevState) =>({...prevState, videoSet: true}));
            }
        };

        this.actualVideo.onseeked = e => {
            if(Object.keys(this.props.currentVideo).length > 0) {
                if (Math.ceil(e.target.currentTime) < +this.props.currentVideo.start ||
                    Math.floor(e.target.currentTime) > +this.props.currentVideo.end) {
                        const newVideoSrc = `${this.defaulUrl}#t=${this.props.currentVideo.start},${this.props.currentVideo.end}`;
                        this.actualVideo.src = newVideoSrc;  
                }
            }
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.currentVideo) {
            const newVideoSrc = `${this.defaulUrl}#t=${nextProps.currentVideo.start},${nextProps.currentVideo.end}`;
            this.actualVideo.src = newVideoSrc;
        }
    }

    playPause = () => {
        if (this.actualVideo.paused)
            this.actualVideo.play();
        else
            this.actualVideo.pause();
    }

    render() {
        return (
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
            );
    }
}

const mapStateToProps = state => ({
    currentVideo: state.videoList.currentVideo,
});

const mapDispachToProps = {
    setOriginalVideoToList
}

export default connect(mapStateToProps, mapDispachToProps)(VideoPlayer)