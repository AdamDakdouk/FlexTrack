import React from 'react';

const SignUpForm = ({ formData, handleChange, handleSubmit, setError, error }) => {
    const styles = {
        
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #FFD700',
            backgroundColor: '#1F1F1F',
            color: '#FFD700',
        },
        button: {
            backgroundColor: '#FFD700',
            color: '#121212',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
        error: {
            backgroundColor: '#FF4C4C',
            color: '#121212',
            padding: '10px',
            borderRadius: '5px',
            marginTop: '10px',
        },
        h2: {
            color: '#FFD700',  // Add some styling to the heading
            fontSize: '24px',
            marginBottom: '20px',  // Add space below
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        setError('');
        handleSubmit();
    };

    return (
        <form  onSubmit={onSubmit}>
            <h2 style={styles.h2}>Register</h2>
            
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                required
            />
            <button type="submit" style={styles.button}>Sign Up</button>
            {error && <div style={styles.error}>{error}</div>}
        </form>
    );
};

export default SignUpForm;
