import React, { Component } from 'react';
import Cookies from 'js-cookie';

import Utility from '../utils';
import VideoCardHorizontal from './VideoCardHorizontal';
import VideoCard from './VideoCard';

const CLASS_NAME = 'yf-user';
const videoResults = Utility.getVideoLists();

class User extends Component {
  constructor(props) {
    super(props);
    const selected = Cookies.getJSON('confirm') || [];
    this.state = {
      selectedVideos: selected.map(val => videoResults[val])
    };
  }

  render() {
    const { selectedVideos } = this.state;

    return (
      <div className={ CLASS_NAME }>
        <h4>Submissions Tracking</h4>
        { selectedVideos.map(this.renderSubmission.bind(this)) }
      </div>
    );
  }

  renderSubmission(video, index) {
    return (
      <div key={ index }>
        <div className="row">
          <div className="col-xs-12 col-sm-7 yf-min-tablet-visible">
            <VideoCardHorizontal video={ video } />
          </div>
          <div className="col-xs-12 col-sm-7 yf-max-mobile-visible">
            <VideoCard video={ video } />
          </div>
          <div className="col-xs-12 col-sm-5">
            <h5>
              { `Status: ${video.status || 'In Progress'}` }
            </h5>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default User;
