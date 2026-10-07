import React from 'react'
import "../styles/authPage.scss"
import Button from '../../utils/Button'
import { Link } from 'react-router-dom'


const ForgotPassword = () => {
  return (
    <section className='main-forgot-password'>
    <div className='forgot-password'>
      <div className="f-top">
        <div className="head-text">forgot your password ?</div>
        <p>enter the email address associated with your account and we will send you instructions to reset your credentials.</p>
      </div>

      <div className="f-buttom">
        <form >
          <label htmlFor="email"> email address</label>
          <input type="email" id='email' name='email' placeholder='test@test.com' required />

          {/* <button type='submit'>Send Reset Instructions</button> */}
          <Button text="Send Reset Instructions" />
        </form>

        <p>remember your password? <span>return to login</span></p>


      </div>
    </div>
    </section>
  )
}

export default ForgotPassword
