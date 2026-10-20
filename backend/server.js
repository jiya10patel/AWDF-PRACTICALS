const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./middleware/auth');
const logger = require('./middleware/logger');
const requireJsonContentType = require('./middleware/requireJsonContentType');
const errorHandler = require('./middleware/errorHandler');
require('./utils/listeners');

const app = express();

// Middleware (in order)
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(requireJsonContentType);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', authMiddleware, taskRoutes);

// Global Error Handler (MUST be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;