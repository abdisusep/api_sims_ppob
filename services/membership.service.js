const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtSecret    = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

const model = require('../models/membership.model');

const registrationUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const updatedData = { ...data, password: hashedPassword };
    return await model.registerUser(updatedData);
}

const loginUser = async (data) => {
    const result = await model.loginUser(data);
    if (!result) {
        return false;
    }
    
    const verifyPassword = await bcrypt.compare(data.password, result.password);
    if (verifyPassword) {
        return jwt.sign({ email: result.email }, jwtSecret, { expiresIn: jwtExpiresIn });
    }
}

const getProfile = async (email) => {
    return await model.getProfile(email);
}

const updateProfile = async (email, data) => {
    return await model.updateProfile(email, data);
}

const updateImage = async (email, fileUrl) => {
    return await model.updateImage(email, fileUrl);
}

const checkEmail = async (email) => {
    return await model.checkEmail(email);
}

module.exports = {
    registrationUser, 
    loginUser, 
    getProfile, 
    updateProfile, 
    updateImage,
    checkEmail
 }