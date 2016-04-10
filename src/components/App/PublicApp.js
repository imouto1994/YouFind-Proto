import React, { Component } from 'react';

import App from './App';

class PublicApp extends Component {
  render() {
    return (
      <App { ...this.props } />
    );
  }
}

export default PublicApp;
