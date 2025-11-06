const Candidate = require('../models/Candidate');

exports.getMyProfile = async (req, res) => {
  try {
    if (req.user.role !== 'candidate') {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    const candidate = await Candidate.findById(req.user.id).select('-password');
    if (!candidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    if (req.user.role !== 'candidate') {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    const { name, password, phone, portfolio, college, branch } = req.body;
    const candidate = await Candidate.findById(req.user.id);
    if (!candidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }
    if (name) candidate.name = name;
    if (password) candidate.password = password; // will be hashed by pre-save hook
    if (phone !== undefined) candidate.phone = phone;
    if (portfolio !== undefined) candidate.portfolio = portfolio;
    if (college !== undefined) candidate.college = college;
    if (branch !== undefined) candidate.branch = branch;
    await candidate.save();
    const safe = candidate.toObject();
    delete safe.password;
    res.json(safe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
