const createAdminMiddleware = (db) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;
      const result = await db.query('SELECT is_admin FROM users WHERE id = $1', [userId]);
      const user = result.rows[0];

      if (user && user.is_admin) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden: Admin access required.' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Not authorized.' });
    }
  };
};

module.exports = createAdminMiddleware;