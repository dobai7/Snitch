import nodemailer from "nodemailer"
import config from "../../config/index.js"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Connection Failed");
    console.error(error);
  } else {
    console.log("SMTP Server is Ready");
  }
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Snitch" <${config.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", to);

    return info;

  } catch (error) {
    console.error("Email sending failed:", error.message);

    throw error;
  }
};

export default sendEmail
