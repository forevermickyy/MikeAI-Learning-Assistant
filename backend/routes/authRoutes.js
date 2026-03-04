const express = require('express');
const router = express.Router();

const { 
    test,
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateProfile

} = require('../controllers/authController.js')

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);
router.post('/update-profile', updateProfile);


module.exports = router;