import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterVideosByTag } from '../../actions/videoListActions';

class VideoFilter extends Component {
    
    state = {
        filter: ''
    }

    onChange = (e) => {
        this.setState({ filter: e.target.value});
        const filtered = this.props.listVideos.filter(x => {
            return (x.tags.filter(t => 
                t.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1).length > 0);
        });
        if (Object.keys(this.props.originalVideo).length) {
            filtered.unshift(this.props.originalVideo);
            this.props.filterVideosByTag(filtered);
        }
    }

    render() {
        return (
            <div className="col-md-4 mb-1">
                <div>
                    <i className="fa fa-search filter-icon"></i>
                    <input
                        name="filter"
                        className="footer-input"
                        value={this.state.filter}
                        placeholder="Tag filter"
                        onChange={this.onChange}
                    />
                </div>
            </div>
            )
    }
}

const mapDispachToProps = {
    filterVideosByTag
};

const mapStateToProps = state => ({
    filteredList: state.videoList.filteredList,
    listVideos: state.videoList.listVideos,
    originalVideo: state.videoList.originalVideo,
    newVideo: state.videoList.newVideo
});

export default connect(mapStateToProps, mapDispachToProps)(VideoFilter)