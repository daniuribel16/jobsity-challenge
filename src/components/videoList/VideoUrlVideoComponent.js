import React, { Component } from 'react';

export default class VideoUrlVideo extends Component {
    
    state = {
        url: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4'
    }

    onClickGo = () => {

    }

    onChange = (e) => {
        this.setState({url: e.target.value});
    }

    render() {
        return (
            <div className="col-6 player-section">
                <div>
                    <i className="fab fa-video"></i>
                    <button
                        className="btn btn-search-new-video"
                        onClick={this.onClickGo}
                    > Go
                    </button>
                    <input
                        name="video-url"
                        className="video-url"
                        value={this.state.url}
                        placeholder="Video URL"
                        onChange={this.onChange}
                        onBlur={this.onBlur} />
                </div>
            </div>
            )
    }
}