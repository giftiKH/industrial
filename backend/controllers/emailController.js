const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: true,
    logger: true,
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res
      .status(200)
      .json({ message: "Email sent successfully", response: info.response });
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.responseCode === 535) {
      res
        .status(401)
        .json({
          error: "Authentication failed. Please check your credentials.",
        });
    } else if (error.code === "EENVELOPE") {
      res
        .status(400)
        .json({
          error:
            "Invalid email address. Please check the recipient email address.",
        });
    } else {
      res
        .status(500)
        .json({ error: "Failed to send email. Please try again later." });
    }
  }
};

module.exports = {
  sendEmail,
};
