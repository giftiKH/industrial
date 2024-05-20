const nodemailer=require('nodemailer');

// Function to send email using nodemailer
async function sendEmail(receiverEmail, subject, text) {
    try {
      // Create a transporter with your SMTP configuration
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "your-email@gmail.com", // Replace with your email
          pass: "your-password", // Replace with your password
        },
      });
  
      // Send mail with defined transport object
      await transporter.sendMail({
        from: '"Your Name" <your-email@gmail.com>', // Sender address
        to: receiverEmail, // List of receivers
        subject: subject, // Subject line
        text: text, // Plain text body
      });
  
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }