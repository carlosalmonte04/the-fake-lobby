import React from 'react';

const LoginForm = (props) => {

  function handleSignupBtnClick(e) {
    e.preventDefault()
    props.toggleSignupForm()
  }

	return (
    <div>
      <div className={`login-error-container ${props.loginError && props.isShowing ? '' : 'away'}`} >
          <span className={`login-error`} >Login error</span>
      </div>
  		<div className={`form-wrapper boxed-login ${props.isShowing ? '' : 'away'}`}>
        <form id="login-form" className="form" >
          <input type={'text'} onChange={(e) => props.handleInputChange('loginUsername', e) } required />
          <label>username</label>
          <input type={'password'} onChange={(e) => props.handleInputChange('loginPassword', e) } required />
          <label>password</label>
          <div className="btns-container">
            <input type={'submit'} className="secondary-btn" value="Signup" onClick={handleSignupBtnClick}/>
            <input type={'submit'} className="primary-btn" value="Login" onClick={props.handleLogin}/>
          </div>
        </form>
      </div>
    </div>
	)
}

export default LoginForm