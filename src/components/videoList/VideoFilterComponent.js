import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterVideosByTag } from '../../actions/videoListActions';
import PropTypes from 'prop-types';

class VideoFilter extends Component {
    
    state = { filter: '' }

    // on type filter
    onChange = e => {
        this.setState({ filter: e.target.value});
        // filter videos witch match its tags from original list
        const filtered = this.props.listVideos.filter(x => {
            return ((e.target.value === '' && !x.tags.length) || (x.tags.filter(t => 
                t.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1).length > 0));
        });
        // add original video if it is required and call filter
        if (Object.keys(this.props.originalVideo).length) {
            if (!filtered.filter(x => x.id === this.props.originalVideo.id).length) {
                filtered.unshift(this.props.originalVideo);
            }
            this.props.filterVideosByTag(filtered);
        }
    }

    
    render() {
        // render input with the ability of filtering
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

// Proptypes
const videoStruct = PropTypes.shape({
    name: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
});

VideoFilter.propTypes = {
    filterVideosByTag: PropTypes.func.isRequired,
    listVideos: PropTypes.arrayOf(videoStruct),
    filteredList: PropTypes.arrayOf(videoStruct),
    newVideo: videoStruct,
    originalVideo: videoStruct,
}

// map states and dispatches to props
const mapDispachToProps = {
    filterVideosByTag
};

const mapStateToProps = state => ({
    filteredList: state.videoList.filteredList,
    listVideos: state.videoList.listVideos,
    originalVideo: state.videoList.originalVideo,
    newVideo: state.videoList.newVideo
});
// export component connection with react - redux
export default connect(mapStateToProps, mapDispachToProps)(VideoFilter)