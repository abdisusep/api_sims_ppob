const service = require('../services/membership.service');
const upload = require('../middleware/upload.middleware');
const multer = require('multer');

const registrationUser = async (req, res) => {
    try {
        const { email, first_name, last_name, password } = req.body;

        if (!email) {
            return res.status(400).json({
                status: 102,
                message: 'Parameter email harus di isi',
                data: null
            });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                status: 102,
                message: 'Parameter email tidak sesuai format',
                data: null
            });
        }

        if (!first_name) {
            return res.status(400).json({
                status: 102,
                message: 'Parameter first_name tidak sesuai format',
                data: null
            });
        }
    
        if (!last_name) {
            return res.status(400).json({
                status: 102,
                message: 'Parameter last_name harus di isi',
                data: null
            });
        }
    
        if (!password) {
            return res.status(400).json({
                status: 102,
                message: 'Parameter password harus di isi',
                data: null
            });
        } else if (password.length < 8) {
            return res.status(400).json({
                status: 102,
                message: 'Password length minimal 8 karakter',
                data: null
            });
        }

        const checkEmail = await service.checkEmail(email);
        if (checkEmail) {
            return res.status(400).json({
                status: 102,
                message: 'Email sudah terdaftar',
                data: null,
            });
        }

        const result = await service.registrationUser(req.body);

        res.status(200).json({
            status: 0,
            message: 'Registrasi berhasil silahkan login',
            data: null
        });
    } catch (err) {
        res.status(500).json({ 
            error: err.message 
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                status: 102,
                message: 'Parameter email harus di isi',
                data: null
            });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                status: 102,
                message: 'Parameter email tidak sesuai format',
                data: null
            });
        }

        if (!password) {
            return res.status(400).json({
                status: 102,
                message: 'Parameter password harus di isi',
                data: null
            });
        }

        const token = await service.loginUser(req.body);
        if (token) {
            res.status(200).json({
                status: 0,
                message: 'Login Sukses',
                data: { token }
            });
        }else{
            res.status(400).json({
                status: 103,
                message: 'Username atau password salah',
                data: null
            });
        }
    } catch (err) {
        res.status(500).json({ 
            error: err.message 
        });
    }
}

const getProfile = async (req, res) => {
    try {
        const result = await service.getProfile(req.email);
        res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: result
        });
    } catch (err) {
        res.status(500).json({ 
            error: err.message 
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { first_name, last_name } = req.body;

        if (!first_name) {
            return res.status(400).json({
                status: 102,
                message: 'Parameter first_name tidak sesuai format',
                data: null
            });
        }
    
        if (!last_name) {
            return res.status(400).json({
                status: 102,
                message: 'Parameter last_name harus di isi',
                data: null
            });
        }

        const result = await service.updateProfile(req.email, req.body);
        res.status(200).json({
            status: 0,
            message: 'Update Pofile berhasil',
            data: result
        });
    } catch (err) {
        res.status(500).json({ 
            error: err.message 
        });
    }
}

const updateImage = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        try {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    status: 102,
                    message: err.message,
                    data: null,
                });
            } else if (err) {
                return res.status(400).json({
                    status: 102,
                    message: err.message,
                    data: null,
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    status: 102,
                    message: 'Field file tidak boleh kosong',
                    data: null,
                });
            }

            const filePath = req.file.path.replace(/\\/g, '/');
            console.log(filePath)
            const fileUrl = `${req.protocol}://${req.get('host')}/${filePath}`;

            const result = await service.updateImage(req.email, fileUrl);

            res.status(200).json({
                status: 0,
                message: 'Update Profile Image berhasil',
                data: result
            });
        } catch (err) {
            res.status(500).json({ 
                error: err.message 
            });
        }
    });
}

module.exports = { 
    registrationUser, 
    loginUser, 
    getProfile, 
    updateProfile, 
    updateImage 
}