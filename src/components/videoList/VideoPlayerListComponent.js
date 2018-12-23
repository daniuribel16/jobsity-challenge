import '../../assets/css/common.scss';
import React, { Component, Fragment } from 'react';
import VideoPlayer from './VideoPlayerComponent';
import VideoList from './VideoListComponent';
import VideoForm from './VideoFormComponent';
import VideoFilter from './VideoFilterComponent';

export default class VideoPlayerList extends Component {
    
    render() { // parent component joining all together
        const view = window.location.hash.replace('#','');
        return (
            <Fragment>
                <div className="row no-gutters">
                    <div className="col-md-12 player-section">
                        <VideoPlayer />      
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 list-section">
                        
                        <VideoList view={view} />
                    </div>
                </div>
                <div className="row footer-section">
                    <VideoForm view={view} />
                    <VideoFilter />
                </div>
            </Fragment>
        )
    }
}