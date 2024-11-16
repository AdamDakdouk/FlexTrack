import React, { useState } from 'react';
import axios from 'axios';
import SignUpForm from './SignUpForm.js';
import LoginForm from './LoginForm.js';
import EmailVerificationForm from './EmailVerificationForm.js';
import ForgotPasswordForm from './ForgotPasswordForm.js';
import PasswordResetSuccess from './PasswordResetSucces.js';
import logo from '../Assets/logo-name.png';

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false); // New state
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', name: '', code: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (endpoint) => {
        try {
            const { data } = await axios.post(endpoint, formData);
            if (endpoint === '/api/auth/forgot-password') {
                setMessage('Verification code sent to your email!');
            } else if (endpoint === '/api/auth/reset-password') {
                setIsPasswordResetSuccess(true); // Show success screen
            } else if (isSignUp && !isEmailVerified) {
                setMessage('Registration successful! Please verify your email.');
                setIsEmailVerified(true);
            } else {
                setMessage(isSignUp ? 'Email Verified! Registration Complete.' : 'Login Successful!');
                localStorage.setItem('token', data.token);
            }
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred.');
        }
    };

    const styles = {
        container: {
            backgroundColor: '#121212',
            color: '#FFD700',
            height: '100vh',
            textAlign: 'center',
        },
        formContainer: {
            maxWidth: '400px',
            margin: '100px auto',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
        },
        toggleButton: {
            backgroundColor: 'transparent',
            color: '#FFD700',
            border: 'none',
            marginTop: '10px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <img src={logo} alt="App Logo" style={{ position: 'absolute', top: '20px', left: '20px', width: '300px' }} />
            <div style={styles.formContainer}>
                {isPasswordResetSuccess ? ( // Show success screen if password reset is successful
                    <PasswordResetSuccess
                        setIsForgotPassword={setIsForgotPassword}
                        setIsSignUp={setIsSignUp}
                    />
                ) : isForgotPassword ? (
                    <ForgotPasswordForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={() => handleSubmit('/api/auth/reset-password')}
                        setIsForgotPassword={setIsForgotPassword}
                    />
                ) : isEmailVerified ? (
                    <EmailVerificationForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={() => handleSubmit('/api/auth/verify-email')}
                    />
                ) : isSignUp ? (
                    <SignUpForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={() => handleSubmit('/api/auth/register')}
                        setError={setError}
                        error={error}
                    />
                ) : (
                    <LoginForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={() => handleSubmit('/api/auth/login')}
                    />
                )}
                {message && <p>{message}</p>}
                {!isPasswordResetSuccess && !isForgotPassword && (
                    <div>
                        <button
                            onClick={() => setIsForgotPassword(true)}
                            style={styles.toggleButton}
                        >
                            Forgot Password?
                        </button>
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            style={styles.toggleButton}
                        >
                            {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
