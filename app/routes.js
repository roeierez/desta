import React from 'react';
import {Route, IndexRoute, DefaultRoute} from 'react-router';

import Root from './components/Root';
import CreateTrip from './components/Pages/CreateTrip';
import Profile from './components/Pages/Profile';
import TripsCollectionPage from './components/Pages/Profile/TripsCollectionPage';
import TripPage from './components/Pages/Profile/TripPage';
import TripsCalendar from './components/Pages/Profile/TripsCalendar';
import TripsMap from './components/Pages/Profile/TripsMap';

export default (
    <Route path="/" component={Root}>
        <IndexRoute component={CreateTrip}/>
        <Route path="/profile" component={Profile}>
            <Route path="/profile/trips" component={TripsCollectionPage} />
            <Route path="/profile/trips/:id" component={TripPage} >
                <Route path="/profile/trips/:id/calendar" component={TripsCalendar} />
                <Route path="/profile/trips/:id/map" component={TripsMap} />
            </Route>
        </Route>
    </Route>
);
