import React, { Component } from 'react';
import VideoPlayer from './VideoPlayerComponent';
import VideoList from './VideoListComponent';
import VideoForm from './VideoFormComponent';

export default class VideoPlayerList extends Component {
    
    render() {
        return (
            <div>
                <div className="row no-gutters  h-100">
                    <div className="col-sm-9">
                        <VideoPlayer />        
                    </div>
                    <div className="col-sm-3" style={{background:'red', height: '100h'}}>
                        <VideoList />
                        <VideoForm />
                    </div>
                    
                </div>
            </div>
            )
    }
}