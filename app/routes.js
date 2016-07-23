import React from 'react';
import {Route, IndexRoute, DefaultRoute} from 'react-router';

import Root from './components/Root';
import CreateTrip from './components/Pages/CreateTrip';
import Profile from './components/Pages/Profile';
import Trips from './components/Pages/Profile/Trips';
import TripInfo from './components/Pages/Profile/TripInfo';

export default (
    <Route path="/" component={Root}>
        <IndexRoute component={CreateTrip}/>
        <Route path="/profile" component={Profile}>
            <Route path="/profile/trips" component={Trips} />
            <Route path="/profile/trips/:id" component={TripInfo} />
        </Route>
    </Route>
);
