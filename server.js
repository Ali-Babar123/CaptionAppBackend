require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const captionRoute = require('./routes/captionRoute');
const categoryRoutes = require('./routes/categoryRoutes')
const hastagRoute = require('./routes/hastags')
const plannerRoute = require('./routes/planner')

const app = express();
const PORT = process.env.PORT || 2000;

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/caption', captionRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/hastag", hastagRoute);
app.use('/api/planner', plannerRoute);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
