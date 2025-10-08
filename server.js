require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');

const app = express();
const PORT = process.env.PORT || 2000;

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
