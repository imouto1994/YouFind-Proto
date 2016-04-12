import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import classnames from 'classnames';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Utility from '../../utils';

const CLASS_NAME = 'yf-app';

const USER_EMAIL = 'matthew_foo@gmail.com';

class App extends Component {
  static propTypes = {
    isUser: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    isUser: false
  };

  state = {
    isMenuOpened: false,
    isSearched: false
  };

  onMenuToggle = () => {
    this.setState({
      isMenuOpened: !this.state.isMenuOpened
    });
  };

  onSearchFormSubmit = e => {
    e.preventDefault();
    this.setState({
      isSearched: true
    });
  };

  onUploadButtonClick = (e) => {
    e.preventDefault();
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
    fileInput.click();
  };

  onFileUpload = () => {
    this.setState({
      isSearched: true
    });
  };

  render() {
    return (
      <div className={ CLASS_NAME }>
        { this.renderHeader() }
        { this.renderBody() }
      </div>
    );
  }

  renderHeader() {
    const { isUser } = this.props;
    const navClasses = [
      'navbar',
      'navbar-default',
      'navbar-fixed-top',
      `${CLASS_NAME}-navbar`
    ];
    const navBrandLogoClasses = [
      'navbar-brand',
      `${CLASS_NAME}-navbar-brand-logo`
    ];
    const navBrandTitleClasses = [
      'navbar-brand',
      `${CLASS_NAME}-navbar-brand-title`
    ];
    const collapseClasses = [
      'collapse',
      'navbar-collapse',
      {
        in: this.state.isMenuOpened
      }
    ];

    return (
      <nav className={ classnames(navClasses) }>
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" onClick={ this.onMenuToggle }>
              MENU
            </button>
            <Link to="/" className={ classnames(navBrandLogoClasses) }>
              <img alt="Brand" src="http://i.imgur.com/4ewFqRE.png" height="100%" />
            </Link>
            <Link to="/" className={ classnames(navBrandTitleClasses) }>
              YouFind
            </Link>
          </div>
          <div className={ classnames(collapseClasses) }>
            { this.renderSearchForm() }
            {
              isUser
              ? this.renderUserHeader()
              : this.renderPublicHeader()
            }
          </div>
        </div>
      </nav>
    );
  }

  renderBody() {
    const { children, isUser } = this.props;
    const { isSearched } = this.state;
    const contentClasses = [
      'container-fluid',
      `${CLASS_NAME}-content`
    ];

    return (
      <div className={ classnames(contentClasses) }>
        { React.cloneElement(children, { isUser, isSearched }) }
      </div>
    );
  }

  renderPublicHeader() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <Link to="/register" className={ `${CLASS_NAME}-navbar-register btn btn-link navbar-btn` }>
          SIGN UP
        </Link>
        <Link to="/login" className={ `${CLASS_NAME}-navbar-login btn btn-primary navbar-btn` }>
          LOG IN
        </Link>
      </ul>
    );
  }

  renderUserHeader() {
    const dropDownClasses = [
      `${CLASS_NAME}-navbar-dropdown`
    ];

    return (
      <ul className="nav navbar-nav navbar-right">
        <NavDropdown className={ classnames(dropDownClasses) }
          title={ this.renderUserAvatar() } id="registeredDropdown">
          <LinkContainer to="/u">
            <MenuItem active={ false } eventKey="1">
              User Panel
            </MenuItem>
          </LinkContainer>
          <MenuItem divider />
          <LinkContainer to="/">
            <MenuItem active={ false } eventKey="2">
              Log Out
            </MenuItem>
          </LinkContainer>
        </NavDropdown>
      </ul>
    );
  }

  renderUserAvatar() {
    return (
      <img className="cb-image-round" src={ Utility.getGravatarUrl(USER_EMAIL) } height="25" />
    );
  }

  renderSearchForm() {
    return (
      <form onSubmit={ this.onSearchFormSubmit }
        className="navbar-form navbar-left"
        role="search">
        <div className="form-group">
          <div className="input-group">
            <input type="text"
              className={ `${CLASS_NAME}-search-input form-control` }
              placeholder="Please input your query text here..." />
            <div className="input-group-btn">
              <input type="file"
                ref="fileInput"
                style={ { display: 'none' } }
                onChange={ this.onFileUpload } />
              <div className="btn btn-link btn-link-primary" onClick={ this.onUploadButtonClick }>
                Upload
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default App;
