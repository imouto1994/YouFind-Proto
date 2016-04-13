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
          <h3>What kind of user are you?</h3>
          <div className="row yf-margin-top-30">
            <div className="col-sm-offset-2 col-sm-4">
              <Link className={ `btn btn-primary btn-block btn-xlg ${CLASS_NAME}-casual` }
                to="/search">
                CASUAL
              </Link>
            </div>
            <div className="col-sm-4">
              <Link className={ `btn btn-primary btn-block btn-xlg ${CLASS_NAME}-pro` } to="/login">
                PROFESSIONAL
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
