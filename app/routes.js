import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Root from './components/Root';
import CreateTrip from './components/Pages/CreateTrip';
import Header from './components/Modules/Header'

export default (
  <Route path="/" component={Root}>
    <Route path="/createtrip" component={CreateTrip} />
  </Route>
);
