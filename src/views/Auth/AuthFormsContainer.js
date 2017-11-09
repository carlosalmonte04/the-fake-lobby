import React, { Component } from 'react';
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Header from '../../components/Header/Header'


export default class AuthFormsCointaner extends Component {

	state = {
		isLoginDisplaying: true,
    loginUsername: 'thelobby',
    loginPassword: 'thelobby',
    signupUsername: '',
    signupPassword: '',
    signupPasswordConf: '',
    loginError: false,
    signupError: false,
	}

  handleFormToggle = () => {
    this.setState({
      isLoginDisplaying: !this.state.isLoginDisplaying
    }) 
  }

  handleInputChange = (input, e) => {
    this.setState({[input]: e.target.value})
  }

  handleSignup = (e) => {
    e.preventDefault()

    var requestParams = {
      method: 'POST', 
      headers: {
        'content-type' : 'application/json'
      },
      "body": JSON.stringify( {"username": this.state.signupUsername, "password": this.state.signupPassword, "password_confirmation": this.state.signupPasswordConf} )
    }

    fetch(`${process.env.REACT_APP_API_URL}/users/`, requestParams)
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

  handleLogin = (e) => {
    e.preventDefault()

    var requestParams = {
      method: 'POST', 
      headers: {
        'content-type' : 'application/json'
      },
      "body": JSON.stringify( {"username": this.state.loginUsername, "password": this.state.loginPassword} )
    }

    fetch(`${process.env.REACT_APP_API_URL}/me/`, requestParams)
    .catch(error => console.log("could not login", error))
    .then(res => res.json())
    .then(json => {
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

  render() {
    return (
      <div>
        <Header location={this.props.location}/>
        <section className="hero-section">
          <div className="form-container">
            <div className="box3d-container" >
              <div className="title-container custom">
                <h1 className={`title custom boxed-login-title ${this.state.isLoginDisplaying ? '' : 'away'}`} >Login</h1>
                <h1 className={`title custom boxed-signup-title ${this.state.isLoginDisplaying ? 'away' : ''}`} >Signup</h1>
              </div>
              <div className="animated fadeIn">
                <LoginForm  isShowing={this.state.isLoginDisplaying} loginError={this.state.loginError} toggleSignupForm={this.handleFormToggle} handleInputChange={this.handleInputChange} handleLogin={this.handleLogin}/>
                <SignupForm isShowing={!this.state.isLoginDisplaying} toggleLoginForm={this.handleFormToggle} handleInputChange={this.handleInputChange} handleSignup={this.handleSignup}/>
              </div>
          	</div>
          </div>
        </section>
        <section className="blue-gradient">
          <div className="blue-gradient-text-container">
            <h1>Awesome information about The Fake Lobby in a blue gradient</h1>
          </div>
        </section>
      </div>
    );
  }
}
