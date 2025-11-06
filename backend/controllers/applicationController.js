const Application = require('../models/Application');
const Job = require('../models/Job');
const sendEmail = require('../utils/sendEmail');
const { applicationSubmittedTemplate, newApplicationAdminNotificationTemplate } = require('../utils/emailTemplates');
const Admin = require('../models/Admin');
const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');

exports.getAllApplications = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }
  const { status, job, college, branch, q } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (job) filter.job = job;
  if (college) filter.college = college;
  if (branch) filter.branch = branch;
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
    ];
  }
  try {
    const applications = await Application.find(filter)
      .populate('candidate', ['name', 'email'])
      .populate('job', ['title']);
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.applyForJob = async (req, res) => {
  const { jobId, coverLetter, name, email, phone, portfolio, college, branch } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: 'Resume is required' });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Prevent duplicate application by same candidate to same job
    const exists = await Application.findOne({ candidate: req.user.id, job: jobId });
    if (exists) {
      return res.status(400).json({ msg: 'You have already applied to this job' });
    }

    // Upload resume buffer to Cloudinary
    const uploadToCloudinary = () => new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'veridia/resumes', resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    const uploaded = await uploadToCloudinary();

    const newApplication = new Application({
      name,
      email,
      phone,
      portfolio,
      college,
      branch,
      candidate: req.user.id,
      job: jobId,
      resume: uploaded.secure_url,
      coverLetter,
    });

    const application = await newApplication.save();

    // Send notifications (candidate + admins)
    try {
      await sendEmail({
        to: email,
        subject: 'Application Received!'
        ,
        html: applicationSubmittedTemplate(name, job.title),
      });
      const admins = await Admin.find({});
      const adminEmails = admins.map((a) => a.email);
      if (adminEmails.length > 0) {
        await sendEmail({
          to: adminEmails.join(','),
          subject: 'New Application Submitted',
          html: newApplicationAdminNotificationTemplate(name, job.title),
        });
      }
    } catch (notifyErr) {
      console.error('Email notification error:', notifyErr.message);
    }

    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getApplicationsForJob = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    const applications = await Application.find({ job: req.params.jobId }).populate('candidate', ['name', 'email']);
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getMyApplications = async (req, res) => {
  if (req.user.role !== 'candidate') {
    return res.status(401).json({ msg: 'Not authorized' });
  }
  try {
    const applications = await Application.find({ candidate: req.user.id }).populate('job', ['title', 'description']);
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateApplicationStatus = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const { status } = req.body;

  try {
    let application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    application.status = status;
    await application.save();

    // Notify candidate about status change
    try {
      const populated = await application.populate('job', 'title');
      await sendEmail({
        to: application.email,
        subject: 'Application Status Update',
        html: require('../utils/emailTemplates').applicationStatusUpdateTemplate(
          application.name,
          populated.job.title,
          status
        ),
      });
    } catch (notifyErr) {
      console.error('Status email error:', notifyErr.message);
    }

    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
