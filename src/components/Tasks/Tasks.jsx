import React, { Component } from 'react';
import {Tooltip,OverlayTrigger} from 'react-bootstrap';
import Checkbox from '../../elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';

export class Tasks extends Component{

    handleCheckbox = event => {
        const target = event.target;
        console.log(event.target);
        this.setState({
            [target.name]: target.checked
        });
    }

    handleTaskDelete = (e) => {
        const sessionId = e.target.id
        var requestParams = {
          method: 'DELETE', 
          headers: {
            'content-type' : 'application/json',
          },
          "body": JSON.stringify( {sessionId} )
        }

        fetch(`${process.env.REACT_APP_API_URL}/lobby_sessions/${sessionId}/`, requestParams)
        .catch(error => console.log("could not create user ", error))
        .then(res => res.json())
        .then(json => {
          console.log("JSON", json)
          if (json.token) {
            localStorage.setItem('token', json.token)
            this.props.toggleLogin(true)
            this.props.history.push('/dashboard')
          }
          else {
            this.setState({loginError: true})
          }
        }) 
    }

    render(){
        const edit = (<Tooltip id="edit_tooltip">Edit Task</Tooltip>);
        const remove = (<Tooltip id="remove_tooltip">Remove</Tooltip>);
        const sessionsObj = this.props.sessions.map(session => {return { title: session['title'], with: session[this.props.role], id: session['id']} } );
        var sessions = []
        var number;
        for (var i = 0; i < sessionsObj.length; i++) {
            number = "checkbox"+i;
            sessions.push(
                <tr key={i}>
                    <td>{`${sessionsObj[i]['title']} with user id ${sessionsObj[i]['with']}` }</td>
                    <td className="td-actions text-right">
                        <OverlayTrigger placement="top" overlay={edit}>
                            <Button
                                bsStyle="info"
                                simple
                                type="button"
                                bsSize="xs"
                            >
                                <i className="fa fa-edit"></i>
                            </Button>
                        </OverlayTrigger>

                        <OverlayTrigger placement="top" overlay={remove}>
                            <Button
                                id={`${sessionsObj[i]['id']}`}
                                bsStyle="danger"
                                simple
                                type="button"
                                bsSize="xs"
                                onClick={this.handleTaskDelete}
                            >
                                <i className="fa fa-times" id={`${sessionsObj[i]['id']}`}></i>
                            </Button>
                        </OverlayTrigger>

                    </td>
                </tr>
            );
        }
        console.log("TASKSS", this.props.sessions)
        return (
            <tbody>
                {sessions}
            </tbody>
        );
    }
}

export default Tasks;
