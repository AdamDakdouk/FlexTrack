const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['strength', 'cardio', 'mobility', 'olympic', 'TRX'], 
        required: true 
    },
    muscleGroup: { 
        type: String, 
        enum: ['arms', 'legs', 'chest', 'shoulders', 'back', 'abs'], 
        required: true 
    },
    measuredIn: { 
        type: String, 
        enum: ['reps', 'time', 'feet', 'yards', 'meters', 'miles', 'kilometers', 'calories', 'kilojoules'], 
        required: true 
    },
    weighted: { type: Boolean, default: false },
    assistedExercise: { type: Boolean, default: false },
    sets: [{
        weight: Number,
        reps: Number,
        breakTime: Number, // Time in seconds
        note: String
    }]
});

const Workout = mongoose.model('Workout', workoutSchema, 'workouts');

module.exports = Workout;
