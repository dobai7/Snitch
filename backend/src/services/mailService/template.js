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

export default {
  verificationTemplate
}