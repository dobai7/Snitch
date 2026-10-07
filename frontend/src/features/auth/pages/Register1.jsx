import "../styles/auth.scss"
import "../../../index.scss"
import google from "../images/google.svg"
import { Link } from "react-router-dom";
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../authSlice"
import registerImg from "../images/register-1.png"
import Loading from "../../utils/Loading"

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
        const { confirmPassword, ...finalData } = formData;
        dispatch(registerUser(finalData))
    }

    const loading = useSelector((state) => state.auth.loading);
    const message = useSelector((state) => state.auth.message);
    const error = useSelector((state) => state.auth.error);


    return (
        <div className='auth-page'>
            <div className="auth-inner">
                <div className="auth-down">
                    {
                        loading ? <Loading />

                            : (error || message) ? (error || message) && (
                                <div className={"msg-box"}>
                                    <h2>{error || message}</h2>
                                    {message && <p>check your mail and verify yourself</p>}
                                    <Link className="link" to="/login">Click here to login</Link>
                                </div>
                            )

                                :

                                <div className="auth-right">
                                    <h1>Create your account</h1>
                                    <form onSubmit={onSubmit}>
                                        <div className="form-inner">
                                            {/*for name */}
                                            <label htmlFor="name">name</label>
                                            <input disabled={loading} type="text" id='name' name='name' value={formData.name} onChange={changeEvent} placeholder='John Willium' required />
                                        </div>

                                        <div className="form-inner">
                                            {/* for email */}
                                            <label htmlFor="email">email</label>
                                            <input disabled={loading} type="email" id='email' name='email' value={formData.email} placeholder='text@test.com' onChange={changeEvent} required />
                                        </div>

                                        <div className="form-inner">
                                            {/* for password */}
                                            <label htmlFor="password">password</label>
                                            <input disabled={loading} type="password" id='password' value={formData.password} name='password' placeholder='test@123' onChange={changeEvent} required />
                                        </div>

                                        <div className="form-inner">
                                            {/* for conformPassword */}
                                            <label htmlFor="confirmPassword">confirm Password</label>
                                            <input disabled={loading} type="password" id='confirmPassword' value={formData.confirmPassword} name='confirmPassword' placeholder='test@123' onChange={changeEvent} required />
                                        </div>

                                        <div className="form-inner">
                                            {/* for phone */}
                                            <label htmlFor="phone">phone</label>
                                            <input disabled={loading} type="tel" id='phone' value={formData.phone} onChange={changeEvent} name='phone' placeholder='1234567890' required />
                                        </div>

                                        <div className='radio'>
                                            <label>Role</label>

                                            <div className='inner-radio'>
                                                <div>
                                                    <input disabled={loading} type="radio" id="buyer" name="role" value="buyer" checked={formData.role === "buyer"} onChange={changeEvent} />
                                                    <label htmlFor="buyer">Buyer</label>
                                                </div>


                                                <div>
                                                    <input disabled={loading} type="radio" id="seller" name="role" value="seller" checked={formData.role === "seller"} onChange={changeEvent} />
                                                    <label htmlFor="seller">Seller</label>
                                                </div>
                                            </div>
                                        </div>

                                        <button disabled={loading} type='submit'>{loading ? "Loading..." : "Register"}</button>

                                    </form>

                                    <p>already have an account? <span>Login</span></p>

                                    <button disabled={loading} className="google-btn">
                                        <img src={google} alt="Google" />
                                        <span>Continue with Google</span>
                                    </button>
                                </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default Register
