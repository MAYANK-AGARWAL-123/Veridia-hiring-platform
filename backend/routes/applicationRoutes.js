const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { applyForJob, getApplicationsForJob, getMyApplications, updateApplicationStatus, getAllApplications } = require('../controllers/applicationController');

router.post('/', [auth, upload], applyForJob);
router.get('/candidate/me', auth, getMyApplications);
router.get('/', auth, getAllApplications);
router.get('/:jobId', auth, getApplicationsForJob);
router.put('/:id', auth, updateApplicationStatus);

module.exports = router;