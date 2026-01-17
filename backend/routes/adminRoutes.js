const express = require('express');
const { protect } = require('../middleware/authMiddleware');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.is_admin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = (db) => {
  const router = express.Router();

  // GET /api/admin/bookings (MATCHES YOUR FRONTEND)
  router.get('/bookings', protect, isAdmin, async (req, res) => {
  try {
    console.log("Admin Request - User ID:", req.userId);

    // adminRoutes.js query part
const result = await db.query(
  `SELECT b.id, b.service_type, b.booking_date, b.time_slot, b.status,
          u.name as user_name, u.email, 
          v.make, v.model, v.registration_number
   FROM public.bookings b
   LEFT JOIN public.users u ON b.user_id = u.id
   LEFT JOIN public.vehicles v ON b.vehicle_id = v.id
   ORDER BY b.booking_date DESC`
);

    console.log("Bookings fetched for Admin:", result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error("ADMIN API ERROR:", err);
    res.status(500).json({ message: "Database Error", error: err.message });
  }
});

  // PUT /api/admin/bookings/:id/status (MATCHES YOUR FRONTEND)
  router.put('/bookings/:id/status', protect, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await db.query(
        "UPDATE public.bookings SET status = $1 WHERE id = $2",
        [status, id]
      );
      res.json({ message: "Status updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to update status" });
    }
  });

const { sendUpdates } = require('../utils/notificationService');

router.put('/bookings/:id/status', protect, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // DB Update
    await db.query("UPDATE public.bookings SET status = $1 WHERE id = $2", [status, id]);

    // Fetch User Info
    const result = await db.query(
      `SELECT u.email, u.phone_number, u.name 
       FROM public.bookings b 
       JOIN public.users u ON b.user_id = u.id 
       WHERE b.id = $1`, [id]
    );

    const user = result.rows[0];

    if (user) {
      // Dono updates ek saath
      await sendUpdates(user.email, user.phone_number, user.name, status);
    }

    res.json({ message: "Status updated and notifications triggered!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// adminRoutes.js mein add karein
router.get('/stats', protect, isAdmin, async (req, res) => {
  try {
    const stats = await db.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status IN ('Booking Confirmed', 'Vehicle Dropped Off', 'Service In Progress')) as active,
        COUNT(*) FILTER (WHERE status = 'Ready for Pickup') as ready,
        COUNT(*) FILTER (WHERE status = 'Service Completed') as completed
      FROM public.bookings
    `);

    res.json(stats.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

  return router;
};