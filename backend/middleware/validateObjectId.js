const mongoose = require('mongoose');

// Validates if ID is a valid MongoDB ObjectId format
// If invalid, rejects with 400 BEFORE hitting database
function validateObjectId(req, res, next) {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: `Invalid task ID format: ${id}`
    });
  }
  next();
}

module.exports = validateObjectId;