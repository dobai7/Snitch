import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/authPage.scss"
import Button from '../../utils/Button'
import verifyBadge from "../images/verify-badge.png"

const Verify = () => {
  return (
    <section className='main-verify'>
      <div className='verify'>
        <div className="verify-badge">
          <div className="verify-badge-outer">
            <img src={verifyBadge} alt="" />
          </div>
          <span className="verify-check" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <div className="f-top">
          <div className="head-text">account verified</div>
          <p>your email is confirmed. you can now sign in and start exploring the collection.</p>
        </div>

        <div className="verify-meta">
          <div>
            <span>Status</span>
            <strong>Confirmed</strong>
          </div>
          <div>
            <span>Account</span>
            <strong>Active</strong>
          </div>
        </div>

        <div className="f-buttom">
          <Link to="/login">
            <Button text="Continue to Login" />
          </Link>
          <p>need a new account? <Link to="/register">register</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Verify
