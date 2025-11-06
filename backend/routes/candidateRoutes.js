const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { getMyProfile, updateMyProfile } = require('../controllers/candidateController');

router.get('/me', auth, getMyProfile);
router.put('/me', auth, updateMyProfile);

module.exports = router;
