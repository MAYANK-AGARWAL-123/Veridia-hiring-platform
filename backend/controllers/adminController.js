const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const { title, description, requirements } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      requirements,
      postedBy: req.user.id,
    });

    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', ['name', 'email']);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateJob = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const { title, description, requirements } = req.body;

  const jobFields = {};
  if (title) jobFields.title = title;
  if (description) jobFields.description = description;
  if (requirements) jobFields.requirements = requirements;

  try {
    let job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: 'Job not found' });

    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteJob = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    let job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: 'Job not found' });

    await Job.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};