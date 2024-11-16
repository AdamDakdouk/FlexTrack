import React from 'react';
import logo from '../Assets/logo.png'; // Replace with the actual path to your logo image

const Footer = () => {
    const styles = {
        footer: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: '#1F1F1F',
            color: '#FFD700',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '10px 20px',
            boxSizing: 'border-box',
            fontSize: '20px',
            zIndex: 1000, // Ensure the footer is on top
        },
        logo: {
            width: '60px',
            height: '60px',
            marginRight: '10px',
        },
        slogan: {
            fontWeight: 'bold',
            backgroundColor:'#1F1F1F'
        },
    };

    return (
        <div style={styles.footer}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <span style={styles.slogan}>Track. Train. Transform</span>
        </div>
    );
};

export default Footer;
