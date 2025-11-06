const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { sendSubmissionNotification, sendStatusUpdateNotification } = require('../controllers/notificationController');

router.post('/submit', auth, sendSubmissionNotification);
router.post('/status-update', auth, sendStatusUpdateNotification);

module.exports = router;