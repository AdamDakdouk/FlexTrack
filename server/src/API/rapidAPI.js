const axios = require('axios');

// API URL 
const EXERCISE_DB_URL = 'https://exercisedb.p.rapidapi.com/exercises';

// Function to fetch exercises
async function fetchExercises(query = '', category = null, muscleGroup = null) {
    try {
        // Define request parameters with provided filters
        const params = {
            category: category || undefined,
            muscle: muscleGroup || undefined,
            search: query || undefined, 
        };

        const response = await axios.get(EXERCISE_DB_URL, {
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            },
            params,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching exercises:", error.message);
        throw new Error('Could not fetch exercises');
    }
}

module.exports = fetchExercises;
