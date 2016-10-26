import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './redux/store/configureStore';
import routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'flag-icon-css/css/flag-icon.min.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {pink500, cyan200, cyan300, cyan700, pinkA200} from 'material-ui/styles/colors';
import styles from 'react-dates/css/styles.scss';
import moment from 'moment';

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

const muiTheme = getMuiTheme({
    palette: {
        //textColor: cyan500,
    },
    appBar: {
        height: 46
    },
    button: {
        height: 30,
        border: "1px solid black"
    },
    dialog: {
        titleFontSize: 18
    },
    tabs: {
        textColor: cyan200,
        selectedTextColor: cyan700,
        backgroundColor: 'transparent'
         //backgroundColor: "rgb(232, 232, 232)",
        // selectedTextColor: pinkA200
    }
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <Router history={history}>
                {routes}
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'));
