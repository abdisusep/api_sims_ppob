const db = require('../config/db.config');

const registerUser = async (data) => {
    const { email, first_name, last_name, password } = data;

    const result = await db.query(
        'INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)',
        [email, first_name, last_name, password]
    );

    return result;
}

const loginUser = async (data) => {
    const { email } = data;
    const result = await db.query('SELECT email, password FROM users WHERE email=$1', [email]);

    return result.rows[0];
}

const getProfile = async (email) => {
    const result = await db.query('SELECT email, first_name, last_name, profile_image FROM users WHERE email=$1', [email]);
    return result.rows[0];
}

const updateProfile = async (email, data) => {
    const { first_name, last_name } = data;

    const result = await db.query(
        'UPDATE users SET first_name=$1, last_name=$2 WHERE email=$3',
        [first_name, last_name, email]
    );

    const updated = await getProfile(email);
    return updated;
}

const updateImage = async (email, fileUrl) => {
    const result = await db.query(
        'UPDATE users SET profile_image=$1 WHERE email=$2',
        [fileUrl, email]
    );

    const updated = await getProfile(email);
    return updated;
}

const checkEmail = async (email) => {
    const result = await db.query('SELECT email FROM users WHERE email = $1', [email]);
    return result.rows[0];
}

module.exports = { 
    registerUser, 
    loginUser, 
    getProfile, 
    updateProfile, 
    updateImage,
    checkEmail
}
