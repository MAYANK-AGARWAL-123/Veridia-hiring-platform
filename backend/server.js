const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

const app = express();

// Init middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/candidate', require('./routes/candidateRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));