const express = require('express');
const Workout = require('../model/Workout'); // Import the Workout model
const User = require('../model/User'); // Import the User model to link workouts to users
const  authenticate  = require('../middleware/auth'); // Middleware verifying the user's token
const { fetchExercises } = require('../API/rapidAPI')
const router = express.Router();

// Apply authentication middleware globally to all routes in this file
router.use(authenticate);

// Search predefined workouts by name, category, muscle group
router.get('/search', async (req, res) => {
    try {
        const { query, category, muscleGroup } = req.query;
        let exercises = await fetchExercises(query, category, muscleGroup);

        res.status(200).json(exercises);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add a new workout (either predefined or custom)
router.post('/add', async (req, res) => {
    try {
        const { name, category, muscleGroup, measuredIn, weighted, assistedExercise, sets} = req.body;

        // Validate required fields
        if (!name || !category || !muscleGroup || !measuredIn) {
            return res.status(400).json({ error: "Missing Fields!" });
        }

        // Create a new workout object
        const newWorkout = new Workout({
            name,
            category,
            muscleGroup,
            measuredIn,
            weighted,
            assistedExercise,
            sets
        });

        // Save the workout to the database
        await newWorkout.save();

        // Update the user's workouts array
        const user = await User.findById(req.userId);
        user.workouts.push(newWorkout._id);
        await user.save();

        res.status(201).json({ message: "Workout added successfully", workout: newWorkout });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// Get all workouts for a user
router.get('/user-workouts', async (req, res) => {
    try {
        const { date } = req.query;  // Get the date from query params
        const user = await User.findById(req.userId).populate('workouts', 'name category muscleGroup date'); // Make sure 'date' is included in the populated workouts
        
        let workouts = user.workouts;
        
        if (date) {
            // If a date is provided, filter the workouts by date
            workouts = workouts.filter(workout => {
                return new Date(workout.date).toISOString() === new Date(date).toISOString();
            });
        }
        
        res.status(200).json(workouts);  // Return filtered workouts
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get a specific workout by ID
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an existing workout
router.put('/update/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        // Validate required fields
        const { name, category, muscleGroup, measuredIn, weighted, assistedExercise, sets } = req.body;
        if (!name || !category || !muscleGroup || !measuredIn) {
            return res.status(400).json({ error: "Name, category, muscleGroup, and measuredIn are required." });
        }

        // Update the workout details
        workout.name = name || workout.name;
        workout.category = category || workout.category;
        workout.muscleGroup = muscleGroup || workout.muscleGroup;
        workout.measuredIn = measuredIn || workout.measuredIn;
        workout.weighted = weighted || workout.weighted;
        workout.assistedExercise = assistedExercise || workout.assistedExercise;
        workout.sets = sets || workout.sets;

        await workout.save();
        res.status(200).json({ message: "Workout updated successfully", workout });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a workout
router.delete('/delete/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        await workout.remove();
        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
