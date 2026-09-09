const verificationTemplate = (verificationLink) => {
  return `
    <div>
      <h2>Verify Your Email</h2>

      <p>
        Click the button below to verify your email address.
      </p>

      <a href="${verificationLink}">
        Verify Email
      </a>
    </div>
  `;
};

const forgotPasswordTemplate = (resetLink) => {
  return `
    <div>
      <h2>Password Reset Request</h2>

      <p>
        We received a request to reset your password.
      </p>

      <a href="${resetLink}">
        Reset Password
      </a>

      <p>
        If you did not request this, ignore this email.
      </p>
    </div>
  `;
};


export default {
  verificationTemplate,
  forgotPasswordTemplate
}