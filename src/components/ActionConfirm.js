import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Cookies from 'js-cookie';

import Utility from '../utils';
import VideoCard from './VideoCard';

const CLASS_NAME = 'yf-action-confirm';
const videoResults = Utility.getVideoLists();

class ActionConfirm extends Component {
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

  onConfirm = () => {
    const { history } = this.props;
    Cookies.set('confirm', Cookies.getJSON('search'));
    history.push('/u/actionResult');
  };

  render() {
    const { reportVideos, contactVideos, requestVideos } = this.state;

    return (
      <div className={ CLASS_NAME }>
        <h3>Are you sure you want to take the following actions?</h3>
        { reportVideos.length ? this.renderReport() : undefined }
        { contactVideos.length ? <hr /> : undefined }
        { contactVideos.length ? this.renderContact() : undefined }
        { requestVideos.length ? <hr /> : undefined }
        { requestVideos.length ? this.renderRequest() : undefined }
        <hr />
        <div className="row">
          <div className="col-xs-6">
            <Link className="btn btn-default" to="/u/actionSubmit">
              BACK
            </Link>
          </div>
          <div className="col-xs-6">
            <button onClick={ this.onConfirm } className="btn btn-primary pull-right">
              CONFIRM
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
        <div className="row">
          { reportVideos.map(this.renderVideo.bind(this)) }
        </div>
      </div>
    );
  }

  renderContact() {
    const { contactVideos } = this.state;

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
    const { requestVideos } = this.state;

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
