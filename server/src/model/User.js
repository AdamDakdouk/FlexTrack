const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    verificationCode: String,  // This will store the verification code
    resetCode: String,         // For password reset
    resetCodeExpiration: Date,  // For password reset expiration
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }]
});

module.exports = mongoose.model('User', userSchema);
