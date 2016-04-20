import React, { Component, PropTypes } from 'react';

// Import styles
import '../styles/main.scss';

const CLASS_NAME = 'yf-root';

class Root extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  componentWillUpdate() {
    // Scroll to top after transition
    window.scrollTo(0, 0);
  }

  render() {
    const { children } = this.props;
    return (
      <div className={ CLASS_NAME }>
        { children }
      </div>
    );
  }
}

export default Root;
