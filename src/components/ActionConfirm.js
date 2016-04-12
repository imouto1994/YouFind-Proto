import React, { Component } from 'react';
import { Link } from 'react-router';

import Utility from '../utils';
import VideoCard from './VideoCard';

const CLASS_NAME = 'yf-action-confirm';
const videoResults = Utility.getVideoLists();
const reportVideos = Utility.getActionVideos()[0].map(val => videoResults[val]);
const contactVideos = Utility.getActionVideos()[1].map(val => videoResults[val]);
const requestVideos = Utility.getActionVideos()[2].map(val => videoResults[val]);

class ActionConfirm extends Component {
  render() {
    return (
      <div className={ CLASS_NAME }>
        <h3>Are you sure you want to take the following actions?</h3>
        { this.renderReport() }
        { contactVideos.length && <hr /> }
        { this.renderContact() }
        { requestVideos.length && <hr /> }
        { this.renderRequest() }
        <hr />
        <div className="row">
          <div className="col-xs-6">
            <Link className="btn btn-default" to="/u/actionSubmit">
              BACK
            </Link>
          </div>
          <div className="col-xs-6">
            <Link className="btn btn-primary pull-right" to="/u/actionResult">
              CONFIRM
            </Link>
          </div>
        </div>
      </div>
    );
  }

  renderReport() {
    return (
      <div className={ `${CLASS_NAME}-report` }>
        <h3>Report Violation to Hosting Site</h3>
        <div className="row">
          { reportVideos.map(this.renderVideo.bind(this)) }
        </div>
      </div>
    );
  }

  renderContact() {
    return (
      <div className={ `${CLASS_NAME}-contact` }>
        <h3>Contact Video Owner</h3>
        <div className="row">
          { contactVideos.map(this.renderVideo.bind(this)) }
        </div>
      </div>
    );
  }

  renderRequest() {
    return (
      <div className={ `${CLASS_NAME}-request` }>
        <h3>Request Linkback / Credit</h3>
        <div className="row">
          { requestVideos.map(this.renderVideo.bind(this)) }
        </div>
      </div>
    );
  }

  renderVideo(video, index) {
    return (
      <div className="col-xs-6 col-sm-4 col-md-3" key={ index }>
        <VideoCard video={ video } />
      </div>
    );
  }
}

export default ActionConfirm;
