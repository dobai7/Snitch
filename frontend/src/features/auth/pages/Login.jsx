import React from 'react'
import "../styles/auth.scss"
import "../../../index.scss"
import loginImg from "../images/login-1.png"
import google from "../images/google.svg"
import Button from '../../utils/Button.jsx'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='login'>
            <div className="r-inner">


                <h1>Welcome back</h1>
                <form>

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

                    <Button text="login" />

                </form>

                <p>forgot password? <span>click here</span></p>

                <p>don't have an account? <Link to="/register">register</Link></p>

                <button className="google-btn">
                    <img src={google} alt="Google" />
                    <span>Continue with Google</span>
                </button>


            </div>
        </div>
    )
}

export default Login
