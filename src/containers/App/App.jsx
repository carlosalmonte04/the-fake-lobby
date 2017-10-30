import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Dashboard from '../../views/Dashboard/Dashboard';
import UserProfile from '../../views/UserProfile/UserProfile';
import TableList from '../../views/TableList/TableList';
import Typography from '../../views/Typography/Typography';
import Icons from '../../views/Icons/Icons';
import Maps from '../../views/Maps/Maps';
import Notifications from '../../views/Notifications/Notifications';
import AuthFormsContainer from '../../views/Auth/AuthFormsContainer'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';

import { connect } from 'react-redux'
import toggleLogin from '../../actions/toggleLogin'

import {style} from "../../variables/Variables.jsx";

import {BrowserHistory} from 'react-router-dom'
import '../../App.css';

class App extends Component {

   componentDidMount() {
       const token = localStorage.getItem('token')
       if (token) {
         this.props.toggleLogin(true)
       }
   }

    render() {
        if (!this.props.isLoggedIn) {
            return (
                <div>
                    <Redirect from="*" to="/login"/>
                    <Route path="/login" component={() => <AuthFormsContainer location={this.props.location} history={this.props.history} toggleLogin={this.props.toggleLogin}/>}/>
                </div>
            )
        }
        else {
            return (
                    <div className="wrapper">
                        <Sidebar {...this.props} />
                        <div id="main-panel" className="main-panel">
                            <Header {...this.props} history={this.props.history} toggleLogin={this.props.toggleLogin}/>                        
                                <Switch>
                                    <Route path="/dashboard" component={Dashboard}/>
                                    <Route path="/user" component={UserProfile}/>
                                    <Route path="/table" component={TableList}/>
                                    <Route path="/icons" component={Icons}/>
                                    <Redirect from="/" to="/dashboard"/>
                                </Switch>
                        </div>
                    </div>


            );
        }
    }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleLogin: (bool) => dispatch(toggleLogin(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)