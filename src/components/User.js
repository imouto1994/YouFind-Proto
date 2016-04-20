import React, { Component } from 'react';
import Cookies from 'js-cookie';
import classnames from 'classnames';

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
      selectedVideos: selected.map(val => videoResults[val]),
      filter: 0
    };
  }

  onFilterChange = (index) => {
    const selected = Cookies.getJSON('confirm') || [];
    const videos = selected
      .map(val => videoResults[val])
      .filter(v => {
        if (index === 1) {
          return v.status === 'Success';
        } else if (index === 2) {
          return typeof v.status === 'undefined';
        }

        return true;
      });
    this.setState({
      filter: index,
      selectedVideos: videos
    });
  };

  render() {
    const { selectedVideos } = this.state;
    const { filter } = this.state;
    const filter0Classes = [
      'btn btn-block',
      filter === 0 ? 'btn-primary' : 'btn-link'
    ];
    const filter1Classes = [
      'btn btn-block',
      filter === 1 ? 'btn-primary' : 'btn-link'
    ];
    const filter2Classes = [
      'btn btn-block',
      filter === 2 ? 'btn-primary' : 'btn-link'
    ];

    return (
      <div className={ CLASS_NAME }>
        <h4>Submissions Tracking</h4>
        <hr />
        <div className="row yf-margin-bottom-30">
          <div className="col-xs-4">
            <button onClick={ () => this.onFilterChange(0) } className={ classnames(filter0Classes) }>ALL</button>
          </div>
          <div className="col-xs-4">
            <button onClick={ () => this.onFilterChange(1) } className={ classnames(filter1Classes) }>SUCCESS</button>
          </div>
          <div className="col-xs-4">
            <button onClick={ () => this.onFilterChange(2) } className={ classnames(filter2Classes) }>PENDING</button>
          </div>
        </div>
        <hr />
        { selectedVideos.map(this.renderSubmission.bind(this)) }
      </div>
    );
  }

  renderSubmission(video, index) {
    return (
      <div key={ index }>
        <div className="row animated fadeInLeft">
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
