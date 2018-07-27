import React from 'react';

const Login = props => {
  const { handleChange, LoginUser, SignUpUser, userName } = props
  return (
    <div className='battle-skry-login'>
    	<h2>Have an account already?</h2>
      	<input className='battle-skry-login-user' onChange={handleChange} value={userName} />
      	<button className="battle-skry-login-button" type="button" onClick={LoginUser}>Login</button>
      	<h2>Or sign up!</h2>
      	<input className='battle-skry-signup-user' onChange={handleChange} value={userName} />
      	<button className="battle-skry-signup-button" type="button" onClick={SignUpUser}>Sign Up</button>
    </div>
  )
}

export default Login;