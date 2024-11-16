import React from 'react';

const PasswordResetSuccess = ({ setIsForgotPassword, setIsSignUp }) => {
    const styles = {
        container: {
            textAlign: 'center',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
            backgroundColor: '#121212',
            color: '#FFD700',
        },
        button: {
            backgroundColor: '#FFD700',
            color: '#121212',
            border: 'none',
            padding: '10px 20px',
            marginTop: '20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
        message: {
            fontSize: '18px',
            margin: '20px 0',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Password Reset Successfully</h2>
            <p style={styles.message}>
                Your password has been reset successfully. Please log in with your new credentials.
            </p>
            <button
                style={styles.button}
                onClick={() => {
                    setIsForgotPassword(false); // Exit forgot password flow
                    setIsSignUp(false); // Ensure login form is shown
                }}
            >
                Back to Login
            </button>
        </div>
    );
};

export default PasswordResetSuccess;
