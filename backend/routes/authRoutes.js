const express = require('express');
const router = express.Router();
const { registerCandidate, loginCandidate, registerAdmin, loginAdmin, getLoggedInUser } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

// Candidate routes
router.post('/candidate/register', registerCandidate);
router.post('/candidate/login', loginCandidate);

// Admin routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

// Get logged in user
router.get('/', auth, getLoggedInUser);

module.exports = router;