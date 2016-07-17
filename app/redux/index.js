import { combineReducers } from 'redux';

import app from './modules/app/app';
import posts from './modules/posts/posts';
import createTrip from './modules/createTrip';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  app,
  posts,
  createTrip,
  form: formReducer
});

export default rootReducer;
