import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVideoList } from '../../actions/videoListActions';

class VideoList extends Component {
    
    componentWillMount = () => {
        this.props.fetchVideoList()
    }

    render() {
        const list = this.props.listVideos.map((val, i) => {
            return (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
              {val.name}
              <i class="fas fa-times"></i>
            </li>)
      });
      return (<ul className="list-group">{list}</ul>)
    }
}

const mapStateToProps = state => ({
    listVideos: state.videoList.listVideos
});
  
const mapDispachToProps = {
    fetchVideoList
};

export default connect(mapStateToProps, mapDispachToProps)(VideoList);