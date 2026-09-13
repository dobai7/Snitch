import "../styles/auth.scss"
import "../../../index.scss"
import google from "../images/google.svg"
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../authSlice"
import registerImg from "../images/register-1.png"

const Register = () => {

    const dispatch = useDispatch();

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

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");   // baad mein better UI se replace karenge
            return;
        }
        const {confirmPassword , ...finalData} = formData;
        dispatch(registerUser(finalData))
    }


    return (
        <div className='auth-page'>
            <div className="auth-left">
                <img src={registerImg} alt="" />
            </div>

            <div className="auth-down">

                <div className="auth-right">
                    <h1>Create your account</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-inner">
                            {/*for name */}
                            <label htmlFor="name">name</label>
                            <input type="text" id='name' name='name' value={formData.name} onChange={changeEvent} placeholder='John Willium' required />
                        </div>

                        <div className="form-inner">
                            {/* for email */}
                            <label htmlFor="email">email</label>
                            <input type="email" id='email' name='email' value={formData.email} placeholder='text@test.com' onChange={changeEvent} required />
                        </div>

                        <div className="form-inner">
                            {/* for password */}
                            <label htmlFor="password">password</label>
                            <input type="password" id='password' value={formData.password} name='password' placeholder='test@123' onChange={changeEvent} required />
                        </div>

                        <div className="form-inner">
                            {/* for conformPassword */}
                            <label htmlFor="confirmPassword">confirm Password</label>
                            <input type="password" id='confirmPassword' value={formData.confirmPassword} name='confirmPassword' placeholder='test@123' onChange={changeEvent} required />
                        </div>

                        <div className="form-inner">
                            {/* for phone */}
                            <label htmlFor="phone">phone</label>
                            <input type="tel" id='phone' value={formData.phone} onChange={changeEvent} name='phone' placeholder='1234567890' required />
                        </div>

                        <div className='radio'>
                            <label>Role</label>

                            <div className='inner-radio'>
                                <div>
                                    <input type="radio" id="buyer" name="role" value="buyer" checked={formData.role === "buyer"} onChange={changeEvent} />
                                    <label for="buyer">Buyer</label>
                                </div>


                                <div>
                                    <input type="radio" id="seller" name="role" value="seller" checked={formData.role === "seller"} onChange={changeEvent} />
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
