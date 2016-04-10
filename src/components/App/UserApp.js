import React, { Component } from 'react';

import App from './App';

class UserApp extends Component {
  render() {
    return (
      <App { ...this.props } isUser />
    );
  }
}

export default UserApp;
