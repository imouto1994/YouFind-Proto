import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

const CLASS_NAME = 'yf-feedback';

class Feedback extends Component {
  static propTypes = {
    toggle: React.PropTypes.bool.isRequired
  };

  state = {
    showModal: false,
    stage: 0
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.toggle !== this.props.toggle) {
      this.setState({ showModal: !this.state.showModal, stage: 0 });
    }
  }

  onCloseModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  onStageChange = (index) => {
    this.setState({
      stage: index
    });
  };

  render() {
    const { stage } = this.state;
    if (stage === 0) {
      return this.renderStageZero();
    } else if (stage === 1) {
      return this.renderStageOne();
    } else {
      return this.renderStageTwo();
    }
  }

  renderStageZero() {
    const { showModal } = this.state;

    return (
      <Modal className={ `${CLASS_NAME} ${CLASS_NAME}-stage-0` }
        show={ showModal }
        onHide={ this.onCloseModal } >
        <Modal.Header closeButton className={ `${CLASS_NAME}-stage-0-header` }>
        </Modal.Header>
        <Modal.Body className={ `${CLASS_NAME}-body ${CLASS_NAME}-stage-0-body` }>
          <h3>Would you like to give detailed feedback?</h3>
          <div className="row yf-margin-top-60">
            <div className="col-xs-6">
              <button className="btn btn-primary btn-block" onClick={ () => this.onStageChange(1) }>
                YES PLEASE
              </button>
            </div>
            <div className="col-xs-6">
              <button className="btn btn-default btn-block" onClick={ this.onCloseModal }>
                NO THANKS
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  renderStageOne() {
    const { showModal } = this.state;

    return (
      <Modal className={ `${CLASS_NAME} ${CLASS_NAME}-stage-1` }
        show={ showModal }
        onHide={ this.onCloseModal } >
        <Modal.Body className={ `${CLASS_NAME}-body ${CLASS_NAME}-stage-1-body` }>
          <h4>Please leave your feedback</h4>
          <div className="form-group">
            <textarea id="feedback"
              className={ `${CLASS_NAME}-textarea form-control` }
              rows="12" />
          </div>
          <button className="btn btn-primary btn-block yf-margin-top-30" onClick={ () => this.onStageChange(2) }>
            SUBMIT
          </button>
        </Modal.Body>
      </Modal>
    );
  }

  renderStageTwo() {
    const { showModal } = this.state;

    return (
      <Modal className={ `${CLASS_NAME} ${CLASS_NAME}-stage-2` }
        show={ showModal }
        onHide={ this.onCloseModal } >
        <Modal.Header closeButton className={ `${CLASS_NAME}-stage-2-header` }>
        </Modal.Header>
        <Modal.Body className={ `${CLASS_NAME}-body ${CLASS_NAME}-stage-2-body` }>
          <h3>Thank you for your feedback, we greatly value your input!</h3>
          <button className="btn btn-primary btn-lg yf-margin-top-60" onClick={ this.onCloseModal }>
            Close this window
          </button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default Feedback;
