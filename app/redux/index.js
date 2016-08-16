import { combineReducers } from 'redux';

import app from './modules/app';
import createTrip from './modules/createTrip';
import profile from './modules/profile';
import explore from './modules/explore';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  app,
  createTrip,
  profile,
  explore,
  form: formReducer
});

export default rootReducer;
