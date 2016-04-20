import React, { Component } from 'react';
import { Link } from 'react-router';

const CLASS_NAME = 'yf-action-result';

class ActionResult extends Component {
  render() {
    return (
      <div className={ CLASS_NAME }>
        <div className={ `${CLASS_NAME}-content` }>
          <h3>SUCCESS :)</h3>
          <h4>We will keep you updated on the progress of your submissions</h4>
          <h5 className="yf-margin-top-30">More Details Here</h5>
          <Link className="btn btn-primary" to="/u">
            View Your Profile
          </Link>
        </div>
      </div>
    );
  }
}

export default ActionResult;
