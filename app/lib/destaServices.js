import fetch from 'isomorphic-fetch'
import {getFriendsLocationsHistory} from './facebook';

export const fetchFriendsLocations = () => {
    return getFriendsLocationsHistory();
}

export const getFriendsTrips = () => {
    return fetch('/api/trips/friends', {credentials: 'include'}).then(r => r.json());
}
