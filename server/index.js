const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./src/routes/auth'); // User authentication routes
const workoutRoutes = require('./src/routes/workout'); // Workout routes

const app = express();

dotenv.config();

app.use(cors()); 
app.use(bodyParser.json()); 

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error:', err));

app.use('/api/auth', authRoutes); // User authentication routes
app.use('/api/workouts', workoutRoutes); // Workout routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
