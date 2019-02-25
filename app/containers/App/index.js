/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'containers/Dashboard/Loadable';
import Home from 'containers/Home/Loadable';
import SocialLogin from 'containers/SocialLogin/Loadable';
import Validation from 'containers/Validation/Loadable';
import Reset from 'containers/Reset/Loadable';
import Toaster from 'containers/Toaster/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default function App() {
  return (
    <div id="app-container">
      <Toaster />
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Home} />
        <Route exact path="/socialLogin" component={SocialLogin} />
        <Route exact path="/verify/:code" component={Validation} />
        <Route exact path="/password/reset/:uid/:token" component={Reset} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
