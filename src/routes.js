import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Root from './components/Root';
import Home from './components/Home';
import App from './components/App';
import Search from './components/Search';
import Register from './components/Register';
import Login from './components/Login';

export default (
  <Router history={ browserHistory }>
    <Route path="/" component={ Root }>
      <IndexRoute component={ Home } />
      <Route component={ App }>
        <Route path="search" component={ Search } />
      </Route>
      <Route path="login" component={ Login } />
      <Route path="register" component={ Register } />
    </Route>
  </Router>
);
