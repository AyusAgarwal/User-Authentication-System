const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const passwordreset=require('../Controllers/PasswordReset')

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/requespassword',passwordreset);
router.post('/resetPassword',resetPassword);
module.exports = router;
