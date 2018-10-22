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
import Validation from 'containers/Validation/Loadable';
import Toaster from 'containers/Toaster/Loadable';
// import Docs from 'containers/Docs/Loadable';
// import Demo from 'containers/Demo/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default function App() {
  return (
    <div id="app-container">
      <Toaster />
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/" component={Home} />
        <Route path="/verify/:code" component={Validation} />
        {/* <Route path="/bite-my-shiny-metal-docs" component={Docs} />
        <Route path="/demo" component={Demo} /> */}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
