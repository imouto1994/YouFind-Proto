import React, { Component } from 'react';

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
          <h3>Please choose your user type</h3>
          <button className="btn btn-primary btn-block btn-lg">
            CASUAL USER
          </button>
          <h4>OR</h4>
          <button className="btn btn-primary btn-block btn-lg">
            PROFESSIONAL USER
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
