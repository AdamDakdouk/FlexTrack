import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordForm = ({ formData, handleChange, setIsForgotPassword }) => {
    const [emailError, setEmailError] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);

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
        backButton: {
            backgroundColor: 'transparent',
            color: '#FFD700',
            border: 'none',
            marginTop: '10px',
            cursor: 'pointer',
        },
        errorMessage: {
            color: 'red',
            marginTop: '10px',
        },
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/auth/forgot-password', { email: formData.email });

            // If email is found and code is sent, show the verification code input
            setVerificationSent(true);
            setEmailError(''); // Clear any previous errors

        } catch (error) {
            if (error.response && error.response.data.error) {
                setEmailError(error.response.data.error); // Display the error message from the backend
            } else {
                setEmailError('An error occurred, please try again.');
            }
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                style={styles.input}
                required
            />
            <button type="submit" style={styles.button}>Send Verification Code</button>
            
            {emailError && <div style={styles.errorMessage}>{emailError}</div>}

            {verificationSent && (
                <div>
                    <h3>Enter the verification code sent to your email:</h3>
                    <input
                        type="text"
                        name="verificationCode"
                        placeholder="Verification code"
                        style={styles.input}
                        required
                    />
                    {/* Handle submission of verification code here */}
                </div>
            )}

            <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                style={styles.backButton}
            >
                Return
            </button> 
        </form>
    );
};

export default ForgotPasswordForm;
