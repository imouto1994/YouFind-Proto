import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const CLASS_NAME = 'yf-register';

class Register extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return (
      <div className={ CLASS_NAME }>
        <div className={ `${CLASS_NAME}-card panel animated bounceInUp` }>
          <div className={ `${CLASS_NAME}-card-heading panel-heading` }>
            <Link to="/">
              <img className={ `${CLASS_NAME}-card-heading-image` }
                src="http://i.imgur.com/4ewFqRE.png"
                height="50" />
            </Link>
            <hr />
          </div>
          <div className={ `${CLASS_NAME}-card-body panel-body` }>
            <form className={ `${CLASS_NAME}-form` } onSubmit={ this.onFormSubmit }>
              <div className="form-group">
                <label className="control-label" htmlFor="firstName">First Name</label>
                <input id="fistName"
                  type="text"
                  className="form-control"
                  placeholder="First Name" />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="lastName">Last Name</label>
                <input id="lastName"
                  type="text"
                  className="form-control"
                  placeholder="Last Name" />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="email">Email (*)</label>
                <input id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email" />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="password">Password (*)</label>
                <input id="password"
                  type="password"
                  className="form-control"
                  placeholder="Password" />
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> Link with Google account?
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-block yf-margin-top-15">
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
