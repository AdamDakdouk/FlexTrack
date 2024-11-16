const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }]
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
