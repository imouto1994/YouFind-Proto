import React, { Component } from 'react';
import { Link } from 'react-router';

const CLASS_NAME = 'yf-home';

class Home extends Component {
  render() {
    return (
      <div className={ CLASS_NAME }>
        <div className={ `${CLASS_NAME}-selection` }>
          <div className={ `${CLASS_NAME}-logo` }>
            <img className={ `${CLASS_NAME}-logo-image` } src="http://i.imgur.com/4ewFqRE.png" />
            <span className={ `${CLASS_NAME}-logo-title` }>YouFind</span>
          </div>
          <h3>What kind of users are you?</h3>
          <Link className="btn btn-primary btn-block btn-lg" to="/search">
            CASUAL USER
          </Link>
          <h4>or</h4>
          <Link className="btn btn-primary btn-block btn-lg" to="/login">
            PROFESSIONAL USER
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
