const User = require('../models/User');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

module.exports = {
    createUser: async (req, res) => {
        const user = req.body

        try {
            await admin.auth().getUserByEmail(user.email)
            res.status(400).json({
                message: 'User already exists'
            })
        } catch (error) {
            if (error.code ==='auth/user-not-found') {
            try {
                const userResponse = await admin.auth().createUser({
                    email: user.email,
                    password: user.password,
                    emailVerified: false,
                    disabled: false,
                })

                console.log(userResponse.uid);

                const newUser = new User({
                    uid: userResponse.uid,
                    username: user.username,
                    email: user.email,
                    password: cryptoJS.AES.encrypt(user.password, process.env.SECRET).toString(),
                })
                await newUser.save();
                res.status(201).json({ status: true });
            } catch (error) {
                res.status(500).json({ error: 'An error occured while creating user' })
            }

        }
    }},
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email }, { __v: 0, updatedAt: 0, skills: 0, email: 0 });
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const decryptedPassword = cryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const dpassword = decryptedPassword.toString(cryptoJS.enc.Utf8);
    
            if (dpassword !== req.body.password) {
                return res.status(400).json({ message: 'Invalid Password' });
            }
    
            const userToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
                isAgent: user.isAgent,
                uid: user.uid,
            }, process.env.JWT_SEC, { expiresIn: '21d' });
    
            const { password, isAdmin, ...others } = user._doc;
            res.status(200).json({ ...others, userToken });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'An error occurred while logging in user' });
        }
    }
    
}
