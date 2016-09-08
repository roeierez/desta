import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './redux/store/configureStore';
import routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'flag-icon-css/css/flag-icon.min.css';

if (__DEVELOPMENT__) {
  // https://facebook.github.io/react/docs/advanced-performance.html
  window.Perf = require('react-addons-perf');
}

var initialState = require('./resources/initialState.json');
// try {
//   initialState = window.__INITIAL_STATE__; // for erver-side-rendering
// } catch (err) {
//   initialState = {};
// }

export const history = browserHistory;
let path = window.location.search.split('=');
if (path[0] == '?path' && path[1]) {
    history.push(path[1]);
}

export const store = configureStore();

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={history}>
                {routes}
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
