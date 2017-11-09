import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';


import {Card} from '../../components/Card/Card.jsx';
import {StatsCard} from '../../components/StatsCard/StatsCard.jsx';
import {Tasks} from '../../components/Tasks/Tasks.jsx';
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar
} from '../../variables/Variables.jsx';
import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import {FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
import Button from '../../elements/CustomButton/CustomButton.jsx';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

var today = new Date();
var lastYear = new Date(today.getFullYear() - 1 , today.getMonth(), today.getDate());


class Dashboard extends Component {

    state = {
        insiderUsername: '',
        jobSeekerUsername: '',
        date: '',
        title: '',
        comments: '',
        asInsiderSessions: [],
        asJobSeekerSessions: []
    }

    handleSubmit = (e) => {
       e.preventDefault()
       const requestParams = {
            method: 'POST', 
            headers: {
                'content-type' : 'application/json'
            },
            "body": JSON.stringify({
                "insiderUsername": this.state.insiderUsername, 
                "jobSeekerUsername": this.state.jobSeekerUsername, 
                "date": this.state.date,
                "title": this.state.title,
                "comments": this.state.comments
            })
        }
        fetch('http:\//localhost:8000/api/v1/lobby_sessions/', requestParams)
        .catch(error => console.log("could not create user ", error))
        .then(res => res ? res.json() : console.log("undefined response"))
        .then(json => {
          console.log("JSON", json)
        })
    }

    componentDidMount() {
        const requestParams = {
            method: 'GET', 
            headers: {
                'content-type'  : 'application/json',
                'token'         : localStorage.getItem('token')
            }
        }
        fetch('http:\//localhost:8000/api/v1/lobby_sessions/', requestParams)
        .then(res => res.json())
        .then(sessions => {
            this.setState({
                asInsiderSessions  : sessions.asInsider,
                asJobSeekerSessions: sessions.asJobSeeker
            })
        })
    }

    render() {
        return (
            <div className="content animated fadeIn">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <StatsCard
                                bigIcon={<i className="pe-7s-server text-warning"></i>}
                                statsText="Bitcoin"
                                statsValue="0.023"
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <StatsCard
                                bigIcon={<i className="pe-7s-wallet text-success"></i>}
                                statsText="Cash"
                                statsValue="$750"
                                statsIcon={<i className="fa fa-calendar-o"></i>}
                                statsIconText="Last day"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <InfiniteCalendar
                                className="margin-bottom"
                                width={'100%'}
                                height={290}
                                selected={today}
                                minDate={lastYear}
                              />
                        </div>
                        <div className="col-md-4">
                            <Card
                                classes="table-full-width"
                                title="Lobby"
                                category="As Insider"
                                stats="Updated 3 minutes ago"
                                statsIcon="fa fa-history"
                                content={<table className="table"><Tasks sessions={this.state.asInsiderSessions} role="jobSeeker"/></table>}
                            />
                        </div>
                        <div className="col-md-4">
                            <Card
                                classes="table-full-width"
                                title="Lobby"
                                category="As Job Seeker"
                                stats="Updated 3 minutes ago"
                                statsIcon="fa fa-history"
                                content={<table className="table"><Tasks sessions={this.state.asJobSeekerSessions} role="insider"/></table>}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <Card
                                title="New Session"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols = {["col-md-3" , "col-md-3"]}
                                            proprieties = {[
                                                {
                                                 label : "Username (Insider)",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 placeholder : "Username",
                                                 onChange : (e) => this.setState({insiderUsername: e.target.value}),
                                                 value: this.state.insiderUsername
                                                },
                                                {
                                                 label : "Username (Job Seeker)",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 placeholder : "Username",
                                                 onChange : (e) => this.setState({jobSeekerUsername: e.target.value}),
                                                 value : this.state.jobSeekerUsername
                                                },
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-4"]}
                                            proprieties = {[
                                                {
                                                 label : "Date",
                                                 type : "date",
                                                 bsClass : "form-control",
                                                 placeholder : "Date",
                                                 onChange : (e) => this.setState({date: e.target.value}),
                                                 value : this.state.date
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-4"]}
                                            proprieties = {[
                                                {
                                                 label : "Title",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 placeholder : "<Company> info session",
                                                 onChange : (e) => this.setState({title: e.target.value}),
                                                 value : this.state.title
                                                }
                                            ]}
                                        />
                                        <div className="row">
                                            <div className="col-md-12">
                                                <FormGroup controlId="formControlsTextarea">
                                                    <ControlLabel>Comments</ControlLabel>
                                                    <FormControl rows="5" componentClass="textarea" bsClass="form-control" placeholder="Comments about the session to the other user." defaultValue="Wow, such an amazing session coming up. Such insights, wow." onChange={(e) => this.setState({comments: e.target.value})} value={this.state.comments}/>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <Button
                                            bsStyle="info"
                                            pullRight
                                            fill
                                            type="submit"
                                            onClick={this.handleSubmit}
                                        >
                                            Request Session
                                        </Button>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
