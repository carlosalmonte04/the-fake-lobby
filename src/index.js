import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import uiReducer from './reducers/uiReducer'

import {
    HashRouter,
    Route,
    Switch,
    BrowserRouter as Router
} from 'react-router-dom';


import App from './containers/App/App.jsx';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';



const history = createBrowserHistory();

const store = createStore(uiReducer)


ReactDOM.render((
	<Provider store={store}>
    <Router history={history}>
        <Switch>
            <Route path="/" name="Home" component={App}/>
        </Switch>
    </Router>
  </Provider>
),document.getElementById('root'));
