const express = require('express');
const yup = require('yup');
const { register, login, getMe, seedDB } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

const registerSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().trim().email('Please add a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  role: yup.string().oneOf(['user', 'admin'], 'Role must be user or admin').default('user')
});

const loginSchema = yup.object().shape({
  email: yup.string().trim().email('Please add a valid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, getMe);
router.post('/seed', seedDB);

module.exports = router;
