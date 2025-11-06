const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createJob, getJobs, updateJob, deleteJob } = require('../controllers/adminController');

router.post('/jobs', auth, createJob);
router.get('/jobs', getJobs);
router.put('/jobs/:id', auth, updateJob);
router.delete('/jobs/:id', auth, deleteJob);

module.exports = router;