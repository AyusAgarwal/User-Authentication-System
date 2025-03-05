const crypto = require('crypto');
const nodemailer = require('nodemailer');
const UserModel = require("../Models/User");

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; 
        await user.save();

        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        
        const resetLink = `http://yourfrontend.com/reset-password/${resetToken}`;
        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
        });

        res.json({ message: "Password reset link sent to email", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

