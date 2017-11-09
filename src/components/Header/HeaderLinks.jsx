import React, {Component} from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';


class HeaderLinks extends Component{

    state = {
        isLoggedIn: !!localStorage.getItem('token')
    }

    handleLogout = () => {
        localStorage.removeItem('token')
        this.props.toggleLogin(false)
        this.props.history.push('/login')
    }

    render(){
        const notification = (
            <div>
                <i className="fa fa-globe"></i>
                <b className="caret"></b>
                <span className="notification">5</span>
                <p className="hidden-lg hidden-md">Notification</p>
            </div>
        );
        if (this.state.isLoggedIn) {
            return (
                <div>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">Account</NavItem>
                        <NavItem eventKey={3} href="#" onClick={this.handleLogout}>Log out</NavItem>
                    </Nav>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Nav pullRight>
                    </Nav>
                </div>  
            )
        }
    }
}

export default HeaderLinks;
