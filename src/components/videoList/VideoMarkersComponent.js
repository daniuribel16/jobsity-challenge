import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VideoMarkers extends Component {

    getTimePosition = video => { // return a coordinate on scrren width where a marker will be placed
        return (window.innerWidth / this.props.originalVideo.end) * video.start;
    }

    render = () => { //if it's the original video playing, then render the markers
        const markers = this.props.currentVideo.id === this.props.originalVideo.id ? 
            this.props.videoList.map((val, i) => {
                /* div representing the marker */
                return i !== 0 ? ( 
                <div className="marker tooltip"
                    style={{left: this.getTimePosition(val)}}
                    onClick={() => this.props.playVideoByMarket(val)}
                    key={i}
                > {/*  tooltip showed when is hovered a marker*/}
                    <span className="tooltiptext">{val.name}</span>
                </div>) : null 
        }) : null;
        return (
            <div className="markers-container">
                {markers}
            </div>
        );
    }
}
//Proptypes
const videoStruct = PropTypes.shape({
    name: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
});

VideoMarkers.propTypes = {
    playVideoByMarket: PropTypes.func.isRequired,
    videoList: PropTypes.array.isRequired,
    originalVideo: videoStruct
}
// export component to be used outside
export default VideoMarkers;