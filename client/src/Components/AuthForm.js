import React, { useState } from 'react';
import axios from 'axios';
import SignUpForm from './SignUpForm.js';
import LoginForm from './LoginForm.js';
import EmailVerificationForm from './EmailVerificationForm.js';
import ForgotPasswordForm from './ForgotPasswordForm.js';
import PasswordResetSuccess from './PasswordResetSucces.js';
import logo from '../Assets/logo-name.png';
import Footer from './Footer.js';

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', code: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (endpoint) => {
        try {
            const { data } = await axios.post(endpoint, formData);
            handleResponse(data, endpoint);
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred.');
        }
    };

    const handleResponse = (data, endpoint) => {
        if (endpoint === '/api/auth/forgot-password') {
            setMessage('Verification code sent to your email!');
        } else if (endpoint === '/api/auth/reset-password') {
            setIsPasswordResetSuccess(true);
        } else if (isSignUp && !isEmailVerified) {
            setMessage('Registration successful! Please verify your email.');
            setIsEmailVerified(true);
        } else {
            setMessage(isSignUp ? 'Email Verified! Registration Complete.' : 'Login Successful!');
            localStorage.setItem('token', data.token);
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
        logo: { 
            position: 'absolute', 
            top: '20px', 
            left: '20px', 
            width: '300px' 
        }
    };

    const ToggleButton = ({ onClick, text }) => (
        <button onClick={onClick} style={styles.toggleButton}>
            {text}
        </button>
    );

    const renderForm = () => {
        if (isPasswordResetSuccess) return <PasswordResetSuccess setIsForgotPassword={setIsForgotPassword} setIsSignUp={setIsSignUp} />;
        if (isForgotPassword) return <ForgotPasswordForm formData={formData} handleChange={handleChange} handleSubmit={() => handleSubmit('/api/auth/reset-password')} setIsForgotPassword={setIsForgotPassword} />;
        if (isEmailVerified) return <EmailVerificationForm formData={formData} handleChange={handleChange} handleSubmit={() => handleSubmit('/api/auth/verify-email')} />;
        if (isSignUp) return <SignUpForm formData={formData} handleChange={handleChange} handleSubmit={() => handleSubmit('/api/auth/register')} setError={setError} error={error} />;
        return <LoginForm formData={formData} handleChange={handleChange} handleSubmit={() => handleSubmit('/api/auth/login')} />;
    };

    return (
        <div style={styles.container}>
            <img src={logo} alt="App Logo" style={styles.logo} />
            <div style={styles.formContainer}>
                {renderForm()}
                {message && <p>{message}</p>}
                {!isPasswordResetSuccess && !isForgotPassword && (
                    <div>
                        {isSignUp && ( // Always show this when on sign-up page
                            <ToggleButton onClick={() => setIsSignUp(false)} text="Already have an account?" />
                        )}
                        {!isSignUp && !isForgotPassword && ( // Only show Forgot Password link when on Login page
                            <ToggleButton onClick={() => setIsForgotPassword(true)} text="Forgot Password?" />
                        )}
                        {!isSignUp && ( // Only show "Don't have an account?" on Login page
                            <ToggleButton onClick={() => setIsSignUp(true)} text="Don’t have an account?" />
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AuthForm;
