import React, { Component } from 'react';
import { Link } from 'react-router';

const CLASS_NAME = 'yf-home';

class Home extends Component {
  render() {
    return (
      <div className={ CLASS_NAME }>
        <div className={ `${CLASS_NAME}-selection` }>
          <div className={ `${CLASS_NAME}-logo yf-margin-bottom-45` }>
            <img className={ `${CLASS_NAME}-logo-image` } src="http://i.imgur.com/4ewFqRE.png" />
            <span className={ `${CLASS_NAME}-logo-title yf-margin-left-15` }>YouFind</span>
          </div>
          <h4>What kind of user are you?</h4>
          <div className="row">
            <div className="col-sm-6">
              <Link className={ `btn btn-primary btn-block btn-lg ${CLASS_NAME}-casual` }
                to="/search">
                CASUAL USER
              </Link>
            </div>
            <div className="col-sm-6">
              <Link className={ `btn btn-primary btn-block btn-lg ${CLASS_NAME}-pro` } to="/login">
                PROFESSIONAL USER
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
