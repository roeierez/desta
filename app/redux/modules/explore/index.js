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
    }
}, initialState);

export const fetchLocations = () => {
    return {
        type: 'FETCH_FRIENDS_LOCATIONS',
        payload: {promise: fetchFriendsLocations()}
    }
}