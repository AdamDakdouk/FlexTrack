import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({ user }) => {
    const [date, setDate] = useState(new Date());
    const [workouts, setWorkouts] = useState([]);
    const [note, setNote] = useState('');
    const [exerciseSearch, setExerciseSearch] = useState('');
    const [showExerciseModal, setShowExerciseModal] = useState(false);
    const [predefinedExercises, setPredefinedExercises] = useState([]);
    const [customExercise, setCustomExercise] = useState('');

    // Fetch workouts for the current day
    useEffect(() => {
        const fetchWorkouts = async () => {
            // Ensure the correct API endpoint and passing 'date' as a query parameter
            const response = await axios.get(`/api/user-workouts?date=${date.toISOString()}`);
            setWorkouts(response.data);
        };
    
        fetchWorkouts();
    }, [date]);
    

    // Fetch predefined exercises when modal is open
    useEffect(() => {
        if (showExerciseModal) {
            const fetchExercises = async () => {
                const response = await axios.get('/api/exercises');
                setPredefinedExercises(response.data);
            };

            fetchExercises();
        }
    }, [showExerciseModal]);

    // Handle previous and next date navigation
    const handleDateChange = (direction) => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + direction);
        setDate(newDate);
    };

    // Handle adding a custom exercise
    const handleAddCustomExercise = () => {
        if (customExercise) {
            setWorkouts([...workouts, { name: customExercise }]);
            setCustomExercise('');
            setShowExerciseModal(false);
        }
    };

    // Handle predefined exercise selection
    const handleAddPredefinedExercise = (exercise) => {
        setWorkouts([...workouts, exercise]);
        setShowExerciseModal(false);
    };

    return (
        <div style={styles.container}>
            {/* Header with Today's Date */}
            <div style={styles.header}>
                <h1>{date.toLocaleDateString()}</h1>
                <button onClick={() => handleDateChange(-1)}>←</button>
                <button onClick={() => handleDateChange(1)}>→</button>
            </div>

            {/* Display Today's Workouts */}
            <div style={styles.workoutsContainer}>
                <h3>Today's Workouts</h3>
                {workouts.length === 0 ? (
                    <p>No workouts for today!</p>
                ) : (
                    workouts.map((workout, index) => (
                        <div key={index} style={styles.workoutItem}>
                            <p>{workout.name}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Note for the day */}
            <div style={styles.noteSection}>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note for today's workout"
                    style={styles.noteInput}
                />
                <button style={styles.addButton}>+</button>
            </div>

            {/* Button to Add New Workout */}
            <div style={styles.addWorkoutSection}>
                <button onClick={() => setShowExerciseModal(true)} style={styles.addWorkoutButton}>Add Workout</button>
            </div>

            {/* Modal for Adding a New Workout */}
            {showExerciseModal && (
                <div style={styles.modal}>
                    <h3>Choose or Create an Exercise</h3>
                    <div>
                        <input
                            type="text"
                            value={exerciseSearch}
                            onChange={(e) => setExerciseSearch(e.target.value)}
                            placeholder="Search predefined exercises"
                            style={styles.searchInput}
                        />
                        <div style={styles.predefinedExercises}>
                            {predefinedExercises
                                .filter((exercise) =>
                                    exercise.name.toLowerCase().includes(exerciseSearch.toLowerCase())
                                )
                                .map((exercise) => (
                                    <div key={exercise.id} style={styles.exerciseItem}>
                                        <button onClick={() => handleAddPredefinedExercise(exercise)}>
                                            {exercise.name}
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Option to Create Custom Exercise */}
                    <div style={styles.customExerciseSection}>
                        <input
                            type="text"
                            value={customExercise}
                            onChange={(e) => setCustomExercise(e.target.value)}
                            placeholder="Create Custom Exercise"
                            style={styles.customExerciseInput}
                        />
                        <button onClick={handleAddCustomExercise} style={styles.addCustomExerciseButton}>
                            Add Custom Exercise
                        </button>
                    </div>
                    <button onClick={() => setShowExerciseModal(false)} style={styles.closeModalButton}>Close</button>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#1F1F1F',
        color: '#FFD700',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    workoutsContainer: {
        marginTop: '20px',
    },
    workoutItem: {
        margin: '10px 0',
    },
    noteSection: {
        marginTop: '30px',
        display: 'flex',
        alignItems: 'center',
    },
    noteInput: {
        width: '80%',
        padding: '10px',
        marginRight: '10px',
        backgroundColor: '#1F1F1F',
        border: '1px solid #FFD700',
        color: '#FFD700',
    },
    addButton: {
        backgroundColor: '#FFD700',
        color: '#121212',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    addWorkoutSection: {
        marginTop: '30px',
    },
    addWorkoutButton: {
        backgroundColor: '#FFD700',
        color: '#121212',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    modal: {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#121212',
        padding: '20px',
        borderRadius: '5px',
        zIndex: 10,
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        backgroundColor: '#1F1F1F',
        border: '1px solid #FFD700',
        color: '#FFD700',
    },
    predefinedExercises: {
        maxHeight: '200px',
        overflowY: 'scroll',
    },
    exerciseItem: {
        margin: '5px 0',
    },
    customExerciseSection: {
        marginTop: '20px',
    },
    customExerciseInput: {
        width: '70%',
        padding: '10px',
        marginRight: '10px',
        backgroundColor: '#1F1F1F',
        border: '1px solid #FFD700',
        color: '#FFD700',
    },
    addCustomExerciseButton: {
        backgroundColor: '#FFD700',
        color: '#121212',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    closeModalButton: {
        marginTop: '20px',
        backgroundColor: '#FFD700',
        color: '#121212',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Home;
