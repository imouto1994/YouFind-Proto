import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Cookies from 'js-cookie';
import clone from 'lodash/clone';

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
      requestVideos,
      messageType: {
        report: 'bulk',
        contact: 'bulk',
        request: 'bulk'
      },
      image: undefined,
      images: Array.apply(null, new Array(actions['2'].length))
    };
  }

  onUploadButtonClick = (index) => {
    let fileInput;
    if (typeof index === 'undefined') {
      fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
    } else {
      fileInput = ReactDOM.findDOMNode(this.refs[`fileInput${index}`]);
    }
    fileInput.click();
  };

  onFileUpload = (e, index) => {
    e.preventDefault();
    const reader = new FileReader();
    if (typeof index === 'undefined') {
      reader.onload = event => {
        this.setState({
          image: event.target.result
        });
      };
    } else {
      reader.onload = event => {
        const images = clone(this.state.images);
        images[index] = event.target.result;
        this.setState({
          images
        });
      };
    }

    reader.readAsDataURL(e.target.files[0]);
  };

  onNext = () => {
    const { history } = this.props;
    history.push('/u/actionConfirm');
  };

  onRadioChange = (action, type) => {
    const messageType = clone(this.state.messageType);
    messageType[action] = type;
    if (action === 'request') {
      this.setState({
        messageType,
        image: undefined,
        images: Array.apply(null, new Array(this.state.images.length))
      });
    } else {
      this.setState({
        messageType
      });
    }
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
    const messageType = this.state.messageType.report;

    return (
      <div className={ `${CLASS_NAME}-report` }>
        <h3>Report Violation to Hosting Site</h3>
        <div className="radio yf-margin-bottom-30">
          <label>
            <input type="radio" name="report"
              checked={ messageType === 'bulk' }
              onChange={ () => this.onRadioChange('report', 'bulk') } /> Bulk Message
          </label>
          <label className="yf-margin-left-15">
            <input type="radio" name="report"
              checked={ messageType === 'custom' }
              onChange={ () => this.onRadioChange('report', 'custom') } /> Custom Message
          </label>
        </div>
        {
          messageType === 'bulk'
          ? this.renderReportBulk()
          : undefined
        }
        {
          messageType === 'custom'
          ? this.renderReportCustom()
          : undefined
        }
      </div>
    );
  }

  renderReportBulk() {
    const { reportVideos } = this.state;
    return (
      <div>
        <h4>Selected Videos</h4>
        <div className="row">
          { reportVideos.map(this.renderVideo.bind(this)) }
        </div>
        <h4>Message to Site</h4>
        <div className="form-group">
          <textarea id="feedback-report"
            placeholder="Please leave your message here..."
            className={ `${CLASS_NAME}-textarea form-control` }
            rows="8" />
        </div>
      </div>
    );
  }

  renderReportCustom() {
    const { reportVideos } = this.state;
    return (
      <div>
        <h4>Selected Videos</h4>
        { reportVideos.map(this.renderReportVideoWithMessage.bind(this)) }
      </div>
    );
  }

  renderContact() {
    const messageType = this.state.messageType.contact;

    return (
      <div className={ `${CLASS_NAME}-contact` }>
        <h3>Contact Video Owner</h3>
        <div className="radio yf-margin-bottom-30">
          <label>
            <input type="radio" name="contact"
              checked={ messageType === 'bulk' }
              onChange={ () => this.onRadioChange('contact', 'bulk') } /> Bulk Message
          </label>
          <label className="yf-margin-left-15">
            <input type="radio" name="contact"
              checked={ messageType === 'custom' }
              onChange={ () => this.onRadioChange('contact', 'custom') } /> Custom Message
          </label>
        </div>
        {
          messageType === 'bulk'
          ? this.renderContactBulk()
          : undefined
        }
        {
          messageType === 'custom'
          ? this.renderContactCustom()
          : undefined
        }
      </div>
    );
  }

  renderContactBulk() {
    const { contactVideos } = this.state;
    return (
      <div>
        <h4>Selected Videos</h4>
        <div className="row">
          { contactVideos.map(this.renderVideo.bind(this)) }
        </div>
        <h4>Message to Site</h4>
        <div className="form-group">
          <textarea id="feedback-contact"
            placeholder="Please leave your message here..."
            className={ `${CLASS_NAME}-textarea form-control` }
            rows="8" />
        </div>
      </div>
    );
  }

  renderContactCustom() {
    const { contactVideos } = this.state;
    return (
      <div>
        <h4>Selected Videos</h4>
        { contactVideos.map(this.renderContactVideoWithMessage.bind(this)) }
      </div>
    );
  }

  renderRequest() {
    const messageType = this.state.messageType.request;

    return (
      <div className={ `${CLASS_NAME}-request` }>
        <h3>Request Linkback / Credit</h3>
        <div className="radio yf-margin-bottom-30">
          <label>
            <input type="radio" name="request"
              checked={ messageType === 'bulk' }
              onChange={ () => this.onRadioChange('request', 'bulk') } /> Bulk Message
          </label>
          <label className="yf-margin-left-15">
            <input type="radio" name="request"
              checked={ messageType === 'custom' }
              onChange={ () => this.onRadioChange('request', 'custom') } /> Custom Message
          </label>
        </div>
        {
          messageType === 'bulk'
          ? this.renderRequestBulk()
          : undefined
        }
        {
          messageType === 'custom'
          ? this.renderRequestCustom()
          : undefined
        }
      </div>
    );
  }

  renderRequestBulk() {
    const { requestVideos, image } = this.state;
    return (
      <div>
        <h4>Selected Videos</h4>
        <div className="row">
          { requestVideos.map(this.renderVideo.bind(this)) }
        </div>
        <h4>Upload your watermarked image</h4>
        <div>
          <input type="file"
            ref="fileInput"
            style={ { display: 'none' } }
            onChange={ this.onFileUpload } />
          <div className="btn btn-primary" onClick={ () => this.onUploadButtonClick() }>
            Upload Watermarked Image
          </div>
        </div>
        {
          image &&
          <div className="yf-margin-top-30">
            <div className="yf-display-inline-block">
              <img className={ `${CLASS_NAME}-image` } src={ image } />
            </div>
            <div className="yf-display-inline-block yf-margin-left-15 yf-vertical-align-top">
              <strong>Title: Watermark Image</strong>
              <div>Image Size: 1500 x 900</div>
            </div>
          </div>
        }
        <h4>Message to Owner</h4>
        <div className="form-group">
          <textarea id="feedback-request"
            placeholder="Please leave your message here..."
            className={ `${CLASS_NAME}-textarea form-control` }
            rows="8" />
        </div>
      </div>
    );
  }

  renderRequestCustom() {
    const { requestVideos } = this.state;
    return (
      <div>
        <h4>Selected Videos</h4>
        { requestVideos.map(this.renderRequestVideoWithMessage.bind(this)) }
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

  renderReportVideoWithMessage(video, index) {
    return (
      <div className="row yf-margin-bottom-30" key={ index }>
        <div className="col-xs-12 col-sm-4">
          <VideoCard video={ video } />
        </div>
        <div className="col-xs-12 col-sm-8">
          <div className="form-group">
            <textarea id={ `feedback-report-${index}` }
              placeholder="Please leave your message here..."
              className={ `${CLASS_NAME}-textarea form-control` }
              rows="8" />
          </div>
        </div>
      </div>
    );
  }

  renderContactVideoWithMessage(video, index) {
    return (
      <div className="row yf-margin-bottom-30" key={ index }>
        <div className="col-xs-12 col-sm-4">
          <VideoCard video={ video } />
        </div>
        <div className="col-xs-12 col-sm-8">
          <div className="form-group">
            <textarea id={ `feedback-contact-${index}` }
              placeholder="Please leave your message here..."
              className={ `${CLASS_NAME}-textarea form-control` }
              rows="8" />
          </div>
        </div>
      </div>
    );
  }

  renderRequestVideoWithMessage(video, index) {
    const image = this.state.images[index];

    return (
      <div className="yf-margin-bottom-30" key={ index }>
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <VideoCard video={ video } />
          </div>
          <div className="col-xs-12 col-sm-8">
            <div className="form-group">
              <textarea id={ `feedback-request-${index}` }
                placeholder="Please leave your message here..."
                className={ `${CLASS_NAME}-textarea form-control` }
                rows="8" />
            </div>
          </div>
        </div>
        <div>
          <input type="file"
            ref={ `fileInput${index}` }
            style={ { display: 'none' } }
            onChange={ e => this.onFileUpload(e, index) } />
          <div className="btn btn-primary" onClick={ () => this.onUploadButtonClick(index) }>
            Upload Watermarked Image
          </div>
        </div>
        {
          image &&
          <div className="yf-margin-top-30">
            <div className="yf-display-inline-block">
              <img className={ `${CLASS_NAME}-image` } src={ image } />
            </div>
            <div className="yf-display-inline-block yf-margin-left-15 yf-vertical-align-top">
              <strong>Title: Watermark Image</strong>
              <div>Image Size: 1500 x 900</div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ActionSubmit;
