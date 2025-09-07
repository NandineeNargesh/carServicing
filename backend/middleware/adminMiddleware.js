const createAdminMiddleware = (db) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;
      
      const [users] = await db.query('SELECT is_admin FROM users WHERE id = ?', [userId]);
      const user = users[0];

      if (user && user.is_admin) {
        next(); // The user is an admin, proceed.
      } else {
        res.status(403).json({ message: 'Forbidden: Admin access required.' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Not authorized.' });
    }
  };
};

module.exports = createAdminMiddleware;