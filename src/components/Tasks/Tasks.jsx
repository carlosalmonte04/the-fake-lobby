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
    };
    render(){
        const edit = (<Tooltip id="edit_tooltip">Edit Task</Tooltip>);
        const remove = (<Tooltip id="remove_tooltip">Remove</Tooltip>);
        const tasks_title = [
            'Tim - Software Engineer II',
            'John - Web Developer',
            'Lisa - Junior Mobile Developer',
            'Theresa - Senior Software Engineer',
            'Niko - Curious',
            'Sarah - Looking for an employed boyfriend'
        ];
        var tasks = [];
        var number;
        for (var i = 0; i < tasks_title.length; i++) {
            number = "checkbox"+i;
            tasks.push(
                <tr key={i}>
                    <td>{tasks_title[i]}</td>
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
                                bsStyle="danger"
                                simple
                                type="button"
                                bsSize="xs"
                            >
                                <i className="fa fa-times"></i>
                            </Button>
                        </OverlayTrigger>

                    </td>
                </tr>
            );
        }
        return (
            <tbody>
                {tasks}
            </tbody>
        );
    }
}

export default Tasks;
