import '../../assets/css/video-list.scss';
import React, { Component } from 'react';
import VideoPlayer from './VideoPlayerComponent';
import VideoList from './VideoListComponent';
import VideoForm from './VideoFormComponent';
import VideoUrlVideo from './VideoUrlVideoComponent';

export default class VideoPlayerList extends Component {
    
    render() {
        return (
            <div className="row no-gutters  h-100">
                <div className="col-md-8 col-lg-9 player-section">
                    <VideoUrlVideo />
                    <VideoPlayer />        
                </div>
                <div className="col-md-4 col-lg-3 list-section">
                    <VideoForm />
                    <VideoList />
                </div>
            </div>
            )
    }
}