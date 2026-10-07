import React from 'react'
import google from "../images/google.svg"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import "../styles/authPage.scss"
import Button from '../../utils/Button.jsx'

const Register = () => {
  const loading = false;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "buyer"
  })

  const changeEvent = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  return (
    <div className='register'>
      <div className="r-inner">
        <h1>Create your account</h1>
        <form >
          <div className="form-inner">
            {/*for name */}
            <label htmlFor="name">name</label>
            <input type="text" id='name' name='name' placeholder='John Willium' required />
          </div>

          <div className="form-inner">
            {/* for email */}
            <label htmlFor="email">email</label>
            <input type="email" id='email' name='email' placeholder='text@test.com' required />
          </div>

          <div className="form-inner">
            {/* for password */}
            <label htmlFor="password">password</label>
            <input type="password" id='password' name='password' placeholder='test@123' required />
          </div>

          <div className="form-inner">
            {/* for conformPassword */}
            <label htmlFor="confirmPassword">confirm Password</label>
            <input type="password" id='confirmPassword' name='confirmPassword' placeholder='test@123' required />
          </div>

          <div className="form-inner">
            {/* for phone */}
            <label htmlFor="phone">phone</label>
            <input type="tel" id='phone' name='phone' placeholder='1234567890' required />
          </div>

          <div className='radio'>
            <label>Role</label>

            <div className='inner-radio'>
              <div>
                <input type="radio" id="buyer" name="role" value="buyer" />
                <label htmlFor="buyer">Buyer</label>
              </div>


              <div>
                <input type="radio" id="seller" name="role" value="seller" />
                <label htmlFor="seller">Seller</label>
              </div>
            </div>
          </div>

          <Button text="register"/>

        </form>

        <p>already have an account? <Link to="/login">Login</Link></p>

        <button className="google-btn">
          <img src={google} alt="Google" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  )
}

export default Register
