import React from 'react'

const ResetPassword = () => {
  return (
    <div className='forgot-password'>
      <div className="f-top">
        <div className="head-text">Create new password</div>
        <p>Your new password must be at least 8 characters long and include a mix of uppercase, lowercase, and numbers.</p>
      </div>

      <div className="f-buttom">
        <form >
          <label htmlFor="password">new password</label>
          <input type="password" id='password' name='password' placeholder='test@123' required />

          <label htmlFor="conform-password"> conform password</label>
          <input type="password" id='conform-password' name='conform-password' placeholder='test@123' required />

          <button type='submit'>UPDATE PASSWORD →</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
