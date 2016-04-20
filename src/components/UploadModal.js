import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';

const CLASS_NAME = 'yf-upload-modal';

class UploadModal extends Component {
  static propTypes = {
    toggle: React.PropTypes.bool.isRequired,
    onImageSelected: React.PropTypes.func.isRequired
  };

  state = {
    showModal: false,
    url: ''
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.toggle !== this.props.toggle) {
      this.setState({ showModal: !this.state.showModal });
    }
  }

  onCloseModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  onUploadButtonClick = (e) => {
    e.preventDefault();
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
    fileInput.click();
  };

  onFileUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = event => {
      this.onImageSelected(event.target.result);
      this.setState({
        showModal: false
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  onImageSelected = (img) => {
    const { onImageSelected } = this.props;
    return onImageSelected && onImageSelected(img);
  };

  onInputUrlChange = e => {
    this.setState({
      url: e.target.value
    });
  };

  onConfirmClick = e => {
    e.preventDefault();
    this.onImageSelected(this.state.url);
    this.setState({
      showModal: false
    });
  };

  render() {
    const { showModal } = this.state;

    return (
      <Modal className={ CLASS_NAME }
        show={ showModal }
        onHide={ this.onCloseModal } >
        <Modal.Header closeButton className={ `${CLASS_NAME}-header` }>
          <h4>Upload your image</h4>
        </Modal.Header>
        <Modal.Body className={ `${CLASS_NAME}-body` }>
          <h5>From external URL</h5>
          <div className="form-group">
            <input id="url"
              type="text"
              className="form-control"
              placeholder="Please input your image URL here..."
              onChange={ this.onInputUrlChange } />
          </div>
          <h5 className="yf-margin-top-30">From local machine</h5>
          <input type="file"
            ref="fileInput"
            style={ { display: 'none' } }
            onChange={ this.onFileUpload } />
          <div className="btn btn-primary btn-block" onClick={ this.onUploadButtonClick }>
            BROWSE...
          </div>
          <hr />
          <div className="clearfix">
            <button className="btn btn-primary pull-right" onClick={ this.onConfirmClick }>
              Upload
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UploadModal;
