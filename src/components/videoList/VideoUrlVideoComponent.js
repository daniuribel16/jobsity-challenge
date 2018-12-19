import React, { Component } from 'react';

export default class VideoUrlVideo extends Component {
    
    state = {
        url: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4'
    }

    onBlur = () => {

    }

    onChange = (e) => {
        this.setState({url: e.target.value});
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12 player-section">
                    <input
                        name="video-url"
                        className="video-url"
                        value={this.state.url}
                        placeholder="Video URL"
                        onBlur={this.onBlur} />
                </div>
            </div>
            )
    }
}