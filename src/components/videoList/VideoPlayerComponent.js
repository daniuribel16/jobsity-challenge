import React, { Component, Fragment } from 'react';
import '../../assets/css/billing.css'

export default class VideoPlayer extends Component {
    myVideo = null;

    playPause = () => {
        if (this.myVideo.paused)
            this.myVideo.play();
        else
            this.myVideo.pause();
    }

    makeBig = () => {
        this.myVideo.width += 200;
    }

    makeSmall = () => {
        this.myVideo.width = 320;
    }

    makeNormal = () => {
        this.myVideo.width = 420;
    }

    render() {
        return (
            <Fragment>
                <button onClick={this.playPause}>Play/Pause</button> <br />
                <button onClick={this.makeBig}>Big</button>
                <button onClick={this.makeSmall}>Small</button>
                <button onClick={this.makeNormal}>Normal</button>
                <br /><br />
                    <video ref={v => this.myVideo = v  } id="player" preload="metadata" style={{width:'95%'}} controls>
                        <source src="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4#t=30,40" type="video/mp4" />
                        Your browser does not support HTML5 video.
                </video>
            </Fragment>
                );
            }
}