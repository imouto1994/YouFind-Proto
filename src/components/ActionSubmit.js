import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import Utility from '../utils';
import VideoCard from './VideoCard';

const CLASS_NAME = 'yf-action-submit';
const videoResults = Utility.getVideoLists();
const reportVideos = Utility.getActionVideos()[0].map(val => videoResults[val]);
const contactVideos = Utility.getActionVideos()[1].map(val => videoResults[val]);
const requestVideos = Utility.getActionVideos()[2].map(val => videoResults[val]);

class ActionSubmit extends Component {
  onUploadButtonClick = () => {
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
    fileInput.click();
  };

  render() {
    return (
      <div className={ CLASS_NAME }>
        { this.renderReport() }
        { contactVideos.length && <hr /> }
        { this.renderContact() }
        { requestVideos.length && <hr /> }
        { this.renderRequest() }
        <hr />
        <div className="row">
          <div className="col-xs-6">
            <Link className="btn btn-default" to="/u/actionSelect">
              BACK
            </Link>
          </div>
          <div className="col-xs-6">
            <Link className="btn btn-primary pull-right" to="/u/actionConfirm">
              NEXT
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
        <h4>Selected Videos</h4>
        <div className="row">
          { reportVideos.map(this.renderVideo.bind(this)) }
        </div>
        <h4>Message to Site</h4>
        <div className="form-group">
          <textarea id="feedback-report"
            className={ `${CLASS_NAME}-textarea form-control` }
            rows="8" />
        </div>
      </div>
    );
  }

  renderContact() {
    return (
      <div className={ `${CLASS_NAME}-contact` }>
        <h3>Contact Video Owner</h3>
        <h4>Selected Videos</h4>
        <div className="row">
          { contactVideos.map(this.renderVideo.bind(this)) }
        </div>
        <h4>Message to Owner</h4>
        <div className="form-group">
          <textarea id="feedback-contact"
            className={ `${CLASS_NAME}-textarea form-control` }
            rows="8" />
        </div>
      </div>
    );
  }

  renderRequest() {
    return (
      <div className={ `${CLASS_NAME}-request` }>
        <h3>Request Linkback / Credit</h3>
        <h4>Selected Videos</h4>
        <div className="row">
          { requestVideos.map(this.renderVideo.bind(this)) }
        </div>
        <h4>Upload your watermarked image</h4>
        <div>
          <input type="file"
            ref="fileInput"
            style={ { display: 'none' } } />
          <div className="btn btn-primary" onClick={ this.onUploadButtonClick }>
            Upload Watermarked Image
          </div>
        </div>
        <h4>Message to Owner</h4>
        <div className="form-group">
          <textarea id="feedback-request"
            className={ `${CLASS_NAME}-textarea form-control` }
            rows="8" />
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

export default ActionSubmit;
