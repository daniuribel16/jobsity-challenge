import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VideoMarkers extends Component {

    getTimePosition = video => {
        return (window.innerWidth / this.props.originalVideo.end) * video.start;
    }

    render = () => {
        const markers = this.props.currentVideo.id === this.props.originalVideo.id ? 
            this.props.videoList.map((val, i) => {
                return i !== 0 ? (
                <div className="marker tooltip"
                    style={{left: this.getTimePosition(val)}}
                    onClick={() => this.props.playVideoByMarket(val)}
                >
                    <span class="tooltiptext">{val.name}</span>
                </div>) : null 
        }) : null;
        return (
            <div className="markers-container">
                {markers}
            </div>
        );
    }
}

VideoMarkers.propTypes = {
    videoList: PropTypes.array.isRequired
}

export default VideoMarkers;