const { verifyToken } = require('../services/jwtService');
const middleWare = {
  authMiddleware : (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }
  
    try {
      const decoded = verifyToken(token.split(" ")[1]);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  },
  
  roleMiddleware : (requiredRole) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden' });
      }
  
      next();
    };
  }
};

module.exports = middleWare;
