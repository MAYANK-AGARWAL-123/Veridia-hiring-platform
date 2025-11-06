const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Candidate = require('../models/Candidate');
const Admin = require('../models/Admin');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

exports.registerCandidate = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let candidate = await Candidate.findOne({ email });
    if (candidate) {
      return res.status(400).json({ msg: 'Candidate already exists' });
    }

    candidate = new Candidate({
      name,
      email,
      password,
    });

    

    await candidate.save();

    const payload = {
      user: {
        id: candidate.id,
        role: 'candidate',
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginCandidate = async (req, res) => {
  const { email, password } = req.body;

  try {
    let candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: candidate.id,
        role: 'candidate',
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    admin = new Admin({
      name,
      email,
      password,
    });

    

    await admin.save();

    const payload = {
      user: {
        id: admin.id,
        role: 'admin',
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: admin.id,
        role: 'admin',
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    if (req.user.role === 'candidate') {
      const doc = await Candidate.findById(req.user.id).select('-password');
      if (!doc) return res.status(401).json({ msg: 'No user found' });
      const user = doc.toObject();
      user.role = 'candidate';
      res.json(user);
    } else if (req.user.role === 'admin') {
      const doc = await Admin.findById(req.user.id).select('-password');
      if (!doc) return res.status(401).json({ msg: 'No user found' });
      const user = doc.toObject();
      user.role = 'admin';
      res.json(user);
    } else {
      res.status(401).json({ msg: 'No user found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};