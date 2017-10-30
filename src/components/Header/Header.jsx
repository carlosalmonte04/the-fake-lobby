import React, {Component} from 'react';
import { Navbar } from 'react-bootstrap';

import HeaderLinks from './HeaderLinks.jsx';

class Header extends Component{
    constructor(props){
        super(props);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
        this.state = {
            sidebarExists: false
        };
    }
    mobileSidebarToggle(e){
        if(this.state.sidebarExists === false){
            this.setState({
                sidebarExists : true
            });

        }
        e.preventDefault();
        document.documentElement.classList.toggle('nav-open');
        var node = document.createElement('div');
        node.id = 'bodyClick';
        node.onclick = function(){
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle('nav-open');
        };
        document.body.appendChild(node);
    }
    render(){
        console.log("HISTORY", this.props.history)
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a>The Fake Lobby</a>
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={this.mobileSidebarToggle}/>
                </Navbar.Header>
                <Navbar.Collapse id="header_navbar">
                    <HeaderLinks history={this.props.history} toggleLogin={this.props.toggleLogin} />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
