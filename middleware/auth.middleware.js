require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ 
                status: 108,
                message: 'Token tidak valid atau kadaluwarsa',
                data: null
            });
        }

        req.email = decoded.email;
        next();
    });
};

module.exports = authenticateToken;
