import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const CLASS_NAME = 'yf-login';

class Login extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.pushState(null, '/search');
  };

  render() {
    return (
      <div className={ CLASS_NAME }>
        <div className={ `${CLASS_NAME}-card panel panel-primary` }>
          <div className={ `${CLASS_NAME}-card-heading panel-heading` }>
            Login
          </div>
          <div className={ `${CLASS_NAME}-card-body panel-body` }>
            <form className={ `${CLASS_NAME}-form` } onSubmit={ this.onFormSubmit }>
              <div className="form-group">
                <label className="control-label" htmlFor="email">Email</label>
                <input id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email" />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="password">Password</label>
                <input id="password"
                  type="password"
                  className="form-control"
                  placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                SIGN IN
              </button>
              <div className={ `${CLASS_NAME}-other-links` }>
                <Link to="/register">
                  Are you new user?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
