import React from 'react';

const Login = props => {
  const { handleChange, LoginUser, userName } = props
  return (
    <div className='battle-skry-login'>
      <input className='battle-skry-login-user' onChange={handleChange} value={userName} />
      <button className="battle-skry-login-button" type="button" onClick={LoginUser}>Login</button>
    </div>
  )
}

export default Login;