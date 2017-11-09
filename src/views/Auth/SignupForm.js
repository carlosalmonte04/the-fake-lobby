import React from 'react';


const SignupForm = (props) => {

  function handleLoginBtnClick(e) {
    e.preventDefault()
    props.toggleLoginForm()
  }
	
	return (
    <div className={`form-wrapper boxed-signup ${props.isShowing ? '' : 'away'}`}>
      <form id="signup-form" className="form">
        <input type={'text'} onChange={(e) => props.handleInputChange('signupUsername', e) } required />
        <label>username</label>
        <input type={'password'} onChange={(e) => props.handleInputChange('signupPassword', e) } required />
        <label>password</label>
        <input type={'password'} onChange={(e) => props.handleInputChange('signupPasswordConf', e) } required />
        <label>password confirmation</label>
        <div className="btns-container">
          <input className="secondary-btn" defaultValue="Login" onClick={handleLoginBtnClick} />
          <input type={'submit'} className="primary-btn" defaultValue="Signup" onClick={props.handleSignup} />
        </div>
      </form>
		</div>
	)
}

export default SignupForm