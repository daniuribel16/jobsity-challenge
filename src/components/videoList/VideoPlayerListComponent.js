import '../../assets/css/video-list.scss';
import React, { Component, Fragment } from 'react';
import VideoPlayer from './VideoPlayerComponent';
import VideoList from './VideoListComponent';
import VideoForm from './VideoFormComponent';
import VideoUrlVideo from './VideoUrlVideoComponent';

export default class VideoPlayerList extends Component {
    
    render() {
        return (
            <Fragment>
                <div className="row no-gutters">
                    <div className="col-md-12 player-section">
                        <VideoPlayer />        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 list-section">
                        
                        <VideoList />
                    </div>
                </div>
                <div className="row footer-section">
                    <VideoForm />
                    <VideoUrlVideo />
                </div>
                
            </Fragment>
            )
    }
}