import React from 'react';
import {Route, IndexRoute, DefaultRoute} from 'react-router';

import Root from './components/Root';
import CreateTrip from './components/Pages/CreateTrip';
import Profile from './components/Pages/Profile';
import TripsCollectionPage from './components/Pages/Profile/TripsCollectionPage';
import TripPage from './components/Pages/Profile/TripPage';
import TripDestination from './components/Pages/TripDestination';
import Explore from './components/Pages/Explore';

export default (
    <Route path="/" component={Root}>
        <IndexRoute component={CreateTrip}/>
        <Route path="/:user_id/profile" component={Profile}>
            <Route path="/:user_id/profile/trips" component={TripsCollectionPage} />
            <Route path="/:user_id/profile/trips/:id" component={TripPage} >
                {/*<Route path="/profile/trips/:id/calendar" component={TripsCalendar} />*/}
                {/*<Route path="/profile/trips/:id/map" component={TripsMap} />*/}
            </Route>
            <Route path="/:user_id/profile/trips/:id/destination/:destinationId" component={TripDestination} >
            </Route>
        </Route>
        <Route path="/explore/:country" component={Explore} />
    </Route>
);
