const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const nodemailer = require('nodemailer');
const router = express.Router();

// Helper functions
const sendEmail = (to, subject, text) => {
    return transporter.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject,
        text,
    });
};

const hashPassword = async (password) => bcrypt.hash(password, 10);

const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000);

const findUserByEmailOrUsername = async (emailOrUsername) => {
    return await User.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });
};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const existingUser = await findUserByEmailOrUsername(email);
        if (existingUser) {
            return res.status(400).json({ error: "Email or username already exists" });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            isEmailVerified: false,
        });

        await newUser.save();

        const verificationCode = generateVerificationCode();
        newUser.verificationCode = verificationCode;
        await newUser.save();

        await sendEmail(email, 'Email Verification Code', `Your code is: ${verificationCode}`);

        res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Verify Email Route
router.post('/verify-email', async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }

        if (user.verificationCode !== code) {
            return res.status(400).json({ error: 'Invalid verification code.' });
        }

        user.isEmailVerified = true;
        user.verificationCode = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const user = await findUserByEmailOrUsername(usernameOrEmail);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        // If user not found, return an error
        if (!user) {
            return res.status(404).json({ error: "Email not found. Please check your email address." });
        }

        // Generate a reset code
        const resetCode = crypto.randomBytes(3).toString('hex');
        user.resetCode = resetCode;
        user.resetCodeExpiration = Date.now() + 3600000; // 1 hour expiration
        await user.save();

        // Send the reset code via email
        await sendEmail(email, 'Password Reset Verification Code', `Your verification code is: ${resetCode}`);
        
        res.status(200).json({ message: 'Verification code sent to your email' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Reset Password Route
router.post('/reset-password', async (req, res) => {
    try {
        const { email, resetCode, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.resetCode !== resetCode || user.resetCodeExpiration < Date.now()) {
            return res.status(400).json({ error: "Invalid or expired reset code" });
        }

        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        user.resetCode = undefined;
        user.resetCodeExpiration = undefined;

        await user.save();
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
