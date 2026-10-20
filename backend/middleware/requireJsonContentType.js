// Middleware that rejects POST/PUT without proper Content-Type header
// Protects against accidental form submissions or malformed requests
function requireJsonContentType(req, res, next) {
  if ((req.method === 'POST' || req.method === 'PUT') && req.body) {
    if (!req.is('application/json')) {
      return res.status(400).json({
        success: false,
        error: 'Content-Type must be application/json'
      });
    }
  }
  next();
}

module.exports = requireJsonContentType;