import React, { useState } from 'react';
import axios from 'axios';
import logo from '../Assets/logo2.png';

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false); // New state for email verification
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', name: '', code: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle Forgot Password flow
        if (isForgotPassword) {
            if (!formData.code || !formData.password || formData.password !== formData.confirmPassword) {
                setMessage("Please provide a valid code and matching passwords.");
                return;
            }
            try {
                const { data } = await axios.post('/api/auth/reset-password', formData);
                setMessage('Password reset successful!');
            } catch (error) {
                setMessage(error.response?.data?.error || 'An error occurred.');
            }
            return;
        }

        if (isSignUp && !isEmailVerified) {
            // If the email is not verified yet
            try {
                const { data } = await axios.post('/api/auth/register', formData);
                setMessage('Registration successful! Please verify your email.');
                setIsEmailVerified(true);  // Switch to email verification mode
            } catch (error) {
                setMessage(error.response?.data?.error || 'An error occurred.');
            }
            return;
        }

        // Proceed to login after email is verified
        const endpoint = isSignUp ? '/api/auth/verify-email' : '/api/auth/login'; // Add a verification route here
        try {
            const { data } = await axios.post(endpoint, formData);
            setMessage(isSignUp ? 'Email Verified! Registration Complete.' : 'Login Successful!');
            localStorage.setItem('token', data.token);
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred.');
        }
    };

    const requestPasswordReset = async () => {
        if (!formData.email) {
            setMessage("Please enter your email.");
            return;
        }
        try {
            const { data } = await axios.post('/api/auth/forgot-password', { email: formData.email });
            setMessage('Verification code sent to your email!');
            setIsForgotPassword(true);
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred.');
        }
    };

    const styles = {
        label: {
            textAlign: 'left',
            display: 'block',
            marginBottom: '',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #FFD700',
            backgroundColor: '#1F1F1F',
            color: '#FFD700',
            textAlign: 'left',
        },
        button: {
            backgroundColor: '#FFD700',
            color: '#121212',
            border: 'none',
            padding: '10px 20px',
            margin: '10px 0',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
        toggleButton: {
            backgroundColor: 'transparent',
            color: '#FFD700',
            border: 'none',
            marginTop: '10px',
            cursor: 'pointer',
        },
        message: {
            margin: '10px 0',
            fontSize: '14px',
            color: '#FFD700',
        },
    };

    return (
        <div style={{ backgroundColor: '#121212', color: '#FFD700', height: '100vh' }}>
            <img src={logo} alt="App Logo" style={{ position: 'absolute', top: '20px', left: '20px', width: '300px' }} />

            <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)', textAlign: 'center' }}>
                <h2>{isSignUp ? 'Register' : isForgotPassword ? 'Reset Password' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    {isForgotPassword ? (
                        <>
                            <div>
                                <label style={styles.label}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div>
                                <label style={styles.label}>Verification Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div>
                                <label style={styles.label}>New Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div>
                                <label style={styles.label}>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </>
                    ) : isEmailVerified ? (
                        <div>
                            <div>
                                <label style={styles.label}>Verification Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            {isSignUp && (
                                <div>
                                    <label style={styles.label}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <label style={styles.label}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div>
                                <label style={styles.label}>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            {isSignUp && (
                                <div>
                                    <label style={styles.label}>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            )}
                        </>
                    )}
                    <button type="submit" style={styles.button}>{isForgotPassword ? 'Reset Password' : isSignUp ? 'Sign Up' : 'Log In'}</button>
                </form>
                {isForgotPassword ? (
                    <button onClick={() => setIsForgotPassword(false)} style={styles.toggleButton}>Back to Login</button>
                ) : (
                    <div>
                        <button onClick={() => setIsForgotPassword(true)} style={styles.toggleButton}>Forgot Password?</button>
                        <button onClick={() => setIsSignUp(!isSignUp)} style={styles.toggleButton}>
                            {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}
                        </button>
                    </div>
                )}
                <p style={styles.message}>{message}</p>
            </div>
        </div>
    );
};

export default AuthForm;
