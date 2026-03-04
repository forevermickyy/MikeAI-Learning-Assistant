const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth.js')
const jwt = require('jsonwebtoken');
const axios = require('axios'); 

const test = (req, res) => {
    res.json('test is working')
}

const updateProfile = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) return res.status(403).json({ error: "Invalid token" });

        try {
            // profileData will contain all those 20+ questions from the modal
            const profileData = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                userData.id,
                { 
                    profile: profileData,
                    onboarded: true 
                },
                { new: true }
            ).select('-password');

            res.json(updatedUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to update profile' });
        }
    });
};

//Register Endpoint
const registerUser = async (req, res) => {
    try {
        const {name, email, password, giftCode} = req.body;

        //Check if the name was entered
        if(!name) {
            return res.json({
                error:'name is required'
            })
        };
        //Check if the password was good
        if(!password|| password.length < 6) {
            return res.json({
                error:'Password is required and should be at least 6 characters long'
            })
        };
        //Check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'Email is registered to an account already'
            })
        };

        const hashedPassword = await hashPassword(password);

        //logic for gift code
        let giftMessage = '';
        let giftApplied = false;

        if (giftCode === 'MIKE') {
            giftMessage = 'Thanks for using the Gift Code you have access to all our services!';
            giftApplied = true;
        }
        // create user in database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
            gift: giftMessage,
        })

        return res.json({
            user,
            giftApplied
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Registration failed'});
    }
} 

// Login Endpoint
const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body;

        // Check if user Exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }

        // Check if passwords match
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({email: user.email, id: user._id, name: user.name, gift: user.gift },
                 process.env.JWT_SECRET,
                  {},
                  (err, token) => {
                if (err) throw err;
                res.cookie ('token', token ).json(user)
            })
        }
        if (!match) {
            res.json({
                error: 'Passwords do not match'
            })
            
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) {
               return res.json(null); 
            };
            try {
                const user = await User.findById(userData.id);
                if (user) {
                    res.json({
                        name: user.name,
                        email: user.email,
                        gift: user.gift, 
                        id: user._id,
                        onboarded: user.onboarded,
                        profile: user.profile
                    });
                } else {
                    res.json(null);
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Server error' });
        }
        });
    } else {
        res.json(null);
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully'});
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    updateProfile
}