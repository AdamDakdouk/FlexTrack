import React, { useState } from 'react';

const LoginForm = ({ formData, handleChange, handleSubmit }) => {
    const [error, setError] = useState('');

    const styles = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
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
        h2: {
            color: '#FFD700'
        },
        error: {
            color: '#FFD700',
            backgroundColor: '#121212',
            padding: '10px',
            borderRadius: '5px',
            marginTop: '10px',
            fontWeight: 'bold',
            width: '100%',
            textAlign: 'center',
        },
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmit();
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        }
    };

    return (
        <form style={styles.form} onSubmit={onSubmit}>
            <h2 style={styles.h2}>Login</h2>
            <input
                type="text"
                name="usernameOrEmail"
                placeholder="Email or Username"
                value={formData.usernameOrEmail}
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
            <button type="submit" style={styles.button}>Login</button>
            {error && <div style={styles.error}>{error}</div>}
        </form>
    );
};

export default LoginForm;
