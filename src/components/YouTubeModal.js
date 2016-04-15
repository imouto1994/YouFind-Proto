import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import YouTube from 'react-youtube';

const CLASS_NAME = 'yf-youtube-modal';

class YouTubeModal extends Component {
  static propTypes = {
    toggle: React.PropTypes.bool.isRequired,
    videoId: React.PropTypes.string,
    time: React.PropTypes.number
  };

  state = {
    showModal: true
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.toggle !== this.props.toggle) {
      this.setState({ showModal: !this.state.showModal });
    }
  }

  onCloseModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { videoId, time } = this.props;
    const { showModal } = this.state;
    const opts = {
      width: '100%',
      playerVars: {
        autoplay: 1,
        start: time
      }
    };

    return (
      <Modal className={ CLASS_NAME }
        show={ showModal }
        onHide={ this.onCloseModal } >
        <YouTube videoId={ videoId } opts={ opts } />
      </Modal>
    );
  }
}

export default YouTubeModal;
