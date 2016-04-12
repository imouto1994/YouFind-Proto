import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Root from './components/Root';
import Home from './components/Home';
import { PublicApp, UserApp } from './components/App';
import Search from './components/Search';
import Register from './components/Register';
import Login from './components/Login';
import ActionSelect from './components/ActionSelect';
import ActionSubmit from './components/ActionSubmit';
import ActionConfirm from './components/ActionConfirm';
import ActionResult from './components/ActionResult';
import User from './components/User';

export default (
  <Router history={ browserHistory }>
    <Route path="/" component={ Root }>
      <IndexRoute component={ Home } />
      <Route path="u" component={ UserApp }>
        <IndexRoute component={ User } />
        <Route path="search" component={ Search } />
        <Route path="actionSelect" component={ ActionSelect } />
        <Route path="actionSubmit" component={ ActionSubmit } />
        <Route path="actionConfirm" component={ ActionConfirm } />
        <Route path="actionResult" component={ ActionResult } />
      </Route>
      <Route component={ PublicApp }>
        <Route path="search" component={ Search } />
      </Route>
      <Route path="login" component={ Login } />
      <Route path="register" component={ Register } />
    </Route>
  </Router>
);
