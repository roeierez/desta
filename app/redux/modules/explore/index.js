import {createReducer} from '../../utils/createReducer';
import {fetchFriendsLocations} from '../../../lib/destaServices';
import fetch from 'isomorphic-fetch';
import { loginAsync, logoutAsync } from 'lib/facebook';

const initialState = {
        friendsLocations: []
    };

// For async components
export default createReducer({
    ['FETCH_FRIENDS_LOCATIONS_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            friendsLocations: payload
        }
    },
    ['SELECT_POPULAR_CITY']: (state, {payload}) => {
        return {
            ...state,
            selectedPopularCity: payload
        }
    },
    ['SELECT_TRAVELING_FRIEND']: (state, {payload}) => {
        return {
            ...state,
            selectedTravelingFriend: payload
        }
    }
}, initialState);

export const fetchLocations = () => {
    debugger;
    return {
        type: 'FETCH_FRIENDS_LOCATIONS',
        payload: {promise: loginAsync(true).then(user => {
            return fetchFriendsLocations();
        })}
    }
}

export const selectPopularCity = (cityAndCountry) => {
    return {
        type: 'SELECT_POPULAR_CITY',
        payload: cityAndCountry
    }
}

export const selectTravelingFriend = (userId) => {
    return {
        type: 'SELECT_TRAVELING_FRIEND',
        payload: userId
    }
}