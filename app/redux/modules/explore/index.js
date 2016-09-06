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
    },
    ['SELECT_COUNTRY']: (state, {payload}) => {
        return {
            ...state,
            selectedCountry: payload
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

export const selectPopularCity = (city) => {
    return {
        type: 'SELECT_POPULAR_CITY',
        payload: city
    }
}

export const selectCountry = (country) => {
    return {
        type: 'SELECT_COUNTRY',
        payload: country
    }
}

export const selectTravelingFriend = (userId) => {
    return {
        type: 'SELECT_TRAVELING_FRIEND',
        payload: userId
    }
}