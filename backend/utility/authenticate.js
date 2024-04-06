const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.json({ error: 'User not authorized' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        console.log(decodedToken);
        
        const userData = await User.findOne({ where: { user_id: decodedToken.user_id } });

        if (!userData) {
            return res.status(401).json({ error: 'Not a valid user' });
        }

        req.user = userData;
        next();
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = authenticateUser;
