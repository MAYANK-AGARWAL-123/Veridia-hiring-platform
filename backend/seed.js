const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const Admin = require('./models/Admin');
const Candidate = require('./models/Candidate');
const Job = require('./models/Job');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Admin.deleteMany({});
    await Candidate.deleteMany({});
    await Job.deleteMany({});

    console.log('Database cleared...');

    // --- Create Admin ---
    
    const admin = await Admin.create({
      name: 'Admin User',
      email: 'admin@veridia.com',
      password: 'admin123',
    });
    console.log('Admin user created:');
    console.log('  Email: admin@veridia.com');
    console.log('  Password: admin123');

    // --- Create Candidate ---
    
    await Candidate.create({
      name: 'Test Candidate',
      email: 'candidate@test.com',
      password: 'candidate123',
    });
    console.log('Candidate user created:');
    console.log('  Email: candidate@test.com');
    console.log('  Password: candidate123');

    // --- Create Job ---
    await Job.create({
      title: 'Software Engineer',
      description: 'We are looking for a passionate Software Engineer to design, develop, and install software solutions.',
      requirements: '2+ years of experience with Node.js and React. Bachelor\'s degree in Computer Science.',
      postedBy: admin.id,
    });
    console.log('Sample job created: Software Engineer');

    console.log('\nDatabase seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedData();
