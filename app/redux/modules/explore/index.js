import {createReducer} from '../../utils/createReducer';
import {fetchFriendsLocations} from '../../../lib/destaServices';
import fetch from 'isomorphic-fetch';

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
    }
}, initialState);

export const fetchLocations = () => {
    return {
        type: 'FETCH_FRIENDS_LOCATIONS',
        payload: {promise: fetchFriendsLocations()}
    }
}

export const selectPopularCity = (cityAndCountry) => {
    return {
        type: 'SELECT_POPULAR_CITY',
        payload: cityAndCountry
    }
}