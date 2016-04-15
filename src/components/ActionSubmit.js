import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Cookies from 'js-cookie';

import Utility from '../utils';
import VideoCard from './VideoCard';

const CLASS_NAME = 'yf-action-submit';
const videoResults = Utility.getVideoLists();

class ActionSubmit extends Component {
  static propTypes = {
    history: PropTypes.object
  };

  constructor(props) {
    super(props);
    const actions = Cookies.getJSON('actions') || { 1: [], 2: [], 3: [] };
    const reportVideos = actions['0'].map(val => videoResults[val]);
    const contactVideos = actions['1'].map(val => videoResults[val]);
    const requestVideos = actions['2'].map(val => videoResults[val]);
    this.state = {
      reportVideos,
      contactVideos,
      requestVideos
    };
  }

  onUploadButtonClick = () => {
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
    fileInput.click();
  };

  onNext = () => {
    const { history } = this.props;
    history.push('/u/actionConfirm');
  };

  render() {
    const { reportVideos, contactVideos, requestVideos } = this.state;

    return (
      <div className={ CLASS_NAME }>
        { reportVideos.length ? this.renderReport() : undefined }
        { contactVideos.length ? <hr /> : undefined }
        { contactVideos.length ? this.renderContact() : undefined }
        { requestVideos.length ? <hr /> : undefined }
        { requestVideos.length ? this.renderRequest() : undefined }
        <hr />
        <div className="row">
          <div className="col-xs-6">
            <Link className="btn btn-default" to="/u/actionSelect">
              BACK
            </Link>
          </div>
          <div className="col-xs-6">
            <button onClick={ this.onNext } className="btn btn-primary pull-right">
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderReport() {
    const { reportVideos } = this.state;

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
    const { contactVideos } = this.state;

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
    const { requestVideos } = this.state;

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
