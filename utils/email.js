



const nodemailer = requre ("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: "irev kbkv ouya vwgo",
    },
  })
  const mailOptions = {
    from: "orgaemail@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  }
  await transporter.sendMail(mailOptions)
}

export default sendEmail;