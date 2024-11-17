import React from 'react';
import track from '../Assets/track.png';
import train from '../Assets/train.png';
import transform from '../Assets/transform.png';

const Footer = () => {
    const styles = {
        footer: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: '#1F1F1F',
            color: '#FFD700',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 20px',
            boxSizing: 'border-box',
            fontSize: '20px',
            zIndex: 1000, // Ensure the footer is on top
        },
        sloganContainer: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor:'#1F1F1F',
        },
        slogan: {
            fontWeight: 'bold',
            backgroundColor: '#1F1F1F',
            marginRight: '10px', // Space between text and image
        },
        image: {
            width: '30px', 
            height: 'auto',
            marginRight: '40px'
        }
    };

    return (
        <div style={styles.footer}>
            <div style={styles.sloganContainer}>
                <span style={styles.slogan}>Track</span>
                <img src={track} alt="Track" style={styles.image} />
            </div>
            <div style={styles.sloganContainer}>
                <span style={styles.slogan}>Train</span>
                <img src={train} alt="Train" style={styles.image} />
            </div>
            <div style={styles.sloganContainer}>
                <span style={styles.slogan}>Transform</span>
                <img src={transform} alt="Transform" style={styles.image} />
            </div>
        </div>
    );
};

export default Footer;
