import {createReducer} from '../../utils/createReducer';

const initialState = {
    trips: []
};

// For async components
export default createReducer({
    ['CREATE_TRIP_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            trips: state.trips.concat(payload)
        }
    },
}, initialState);