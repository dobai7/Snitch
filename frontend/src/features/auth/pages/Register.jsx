import React from 'react'
import "../styles/auth.scss"
import "../../../index.scss"
import registerImg from "../images/register-1.png"
import google from "../images/google.svg"


const Register = () => {
    return (
        <div className='auth-page'>
            <div className="auth-left">
                <img src={registerImg} alt="" />
            </div>

            <div className="auth-down">

            <div className="auth-right">
                <h1>Create your account</h1>
                <form>
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
                        <label htmlFor="conformPassword">conform Password</label>
                        <input type="password" id='conformPassword' name='conformPassword' placeholder='test@123' required />
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
                                <input type="radio" id="buyer" name="role" value="buyer" defaultChecked />
                                <label for="buyer">Buyer</label>
                            </div>


                            <div>
                                <input type="radio" id="seller" name="role" value="seller" />
                                <label for="seller">Seller</label>
                            </div>
                        </div>
                    </div>

                    <button type='submit'>Register</button>

                </form>

                <p>already have an account? <span>Login</span></p>

                <button className="google-btn">
                    <img src={google} alt="Google" />
                    <span>Continue with Google</span>
                </button>
            </div>
            </div>
        </div>
    )
}

export default Register
