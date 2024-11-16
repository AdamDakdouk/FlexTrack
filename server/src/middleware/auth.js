const jwt = require('jsonwebtoken');
const User = require('../model/User'); 

// Authentication middleware to verify JWT token
const authenticate = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', ''); // Format "Bearer token"

        if (!token) {
            return res.status(401).json({ error: 'Authentication token is missing or invalid.' });
        }

        // Verify the token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by the decoded ID
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }

        // Attach the user to the request object for further use in routes
        req.userId = user._id;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed. Invalid token.' });
    }
};

module.exports =  authenticate ;
