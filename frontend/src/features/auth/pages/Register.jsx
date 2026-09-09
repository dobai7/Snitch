import React from 'react'
import "../styles/auth.css"

// const formField = (id, name, cName ,type,placeholder,value,onClick) => {
//     return (
//         <div className="form-field">
//             <label htmlFor={id}>{name}</label>
//             <div className="inp-content">
//                 <i className={cName}></i>

//                 <input
//                     type={type}
//                     id={id}
//                     name={name}
//                     placeholder={placeholder}
//                     value={value}
//                     onClick={onClick}
//                 />
//             </div>
//         </div>
//     )
// }

const Register = () => {

    return (
        <div className='register'>
            <div className="lregister">
                <img src="./register.png" alt="" />
            </div>

            <div className="rregister">

                <form>
                    <h2>Create an account</h2>
                    <p>join the exclusive sartorial network.</p>

                    <input type="file" nake="profilePic" accept='image/*' />

                    <div className="btntoggle">
                        <button>buyer</button>
                        <button>seller</button>
                    </div>

                    <div className="form-field">
                        <label htmlFor="name">Full Name</label>
                        <div className="inp-content">
                            <i className="ri-user-3-line"></i>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Willium"
                                value={value}
                                onClick={()=>{}}
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <div className="inp-content">
                            <i className="ri-user-3-line"></i>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@example.com"
                                value={value}
                                onClick={()=>{}}
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="mobile">Mobile</label>
                        <div className="inp-content">
                            <i className="ri-user-3-line"></i>

                            <input
                                type='tel'
                                id="mobile"
                                name="mobile"
                                placeholder="9888889125"
                                value={value}
                                onClick={()=>{}}
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <div className="inp-content">
                            <i className="ri-user-3-line"></i>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="********"
                                value={value}
                                onClick={()=>{}}
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="c-password">Conform Password</label>
                        <div className="inp-content">
                            <i className="ri-user-3-line"></i>

                            <input
                                type="password"
                                id="c-password"
                                name="c-password"
                                placeholder="********"
                                value={value}
                                onClick={()=>{}}
                            />
                        </div>
                    </div>

                    {/* <formField 
                    id="nameField" 
                    name="Full Name" 
                    cName="ri-user-3-line"
                    type="text"
                    placeholder="Josh Willium"
                    value={value}
                    onClick={onClick}
                     /> */}

                </form>
            </div>
        </div>
    )
}

export default Register
