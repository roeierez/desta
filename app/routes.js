import React from 'react';
import {Route, IndexRoute, DefaultRoute} from 'react-router';

import Root from './components/Root';
import CreateTrip from './components/Pages/CreateTrip';
import Profile from './components/Pages/Profile';

export default (
    <Route path="/" component={Root}>
        <IndexRoute path="/" component={CreateTrip}/>
        <Route path="/profile" component={Profile}/>
    </Route>
);
