import React from 'react';

const LoginForm = ({ formData, handleChange, handleSubmit }) => {
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
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <form onSubmit={onSubmit}>
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
            <button type="submit" style={styles.button}>Log In</button>
        </form>
    );
};

export default LoginForm;
