const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const sendEmail = require("../utils/email"); // Fixed the import path

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token with user ID and role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "default_jwt_secret",
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return user information and token with success message
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

function logoutUser(req, res) {
  res.status(200).json({ message: "Logout successful" });
}

async function getUsersByOrganization(req, res) {
  try {
    const { organizationId } = req.params;
    const users = await User.find({ organization: organizationId });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users by organization:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

async function getUsersByRole(req, res) {
  try {
    const { role } = req.params;
    const users = await User.find({ role });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users by role:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

async function resetPassword(req, res) {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique token for password reset
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    // Save the user object with the reset token and expiration time
    await user.save();

    // Send the reset token to the user via email
    const resetUrl = `http://${req.headers.host}/password-reset/${resetToken}`;
    const message = `You requested a password reset. Please make a PUT request to the following URL: ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Token',
        message
      });

      res.status(200).json({ message: "Password reset token sent successfully" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } catch (error) {
    console.error("Error generating password reset token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  loginUser,
  logoutUser,
  getUsersByOrganization,
  getUsersByRole,
  resetPassword,
};
