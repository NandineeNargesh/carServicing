const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const createAdminMiddleware = require('../middleware/adminMiddleware');
const twilio = require('twilio');

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const createAdminRoutes = (db) => {
    const router = express.Router();
    const isAdmin = createAdminMiddleware(db);

    router.get('/bookings', protect, isAdmin, async (req, res) => {
        try {
            const query = `
                SELECT b.id, b.service_type, b.booking_date, b.time_slot, b.status, 
                       u.name AS user_name, u.email, v.make, v.model, v.registration_number
                FROM bookings AS b
                JOIN users AS u ON b.user_id = u.id
                JOIN vehicles AS v ON b.vehicle_id = v.id
                ORDER BY b.booking_date DESC;
            `;
            const result = await db.query(query);
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching admin bookings.' });
        }
    });

    router.put('/bookings/:id/status', protect, isAdmin, async (req, res) => {
        try {
            const { status } = req.body;
            const bookingId = req.params.id;

            const bookingResult = await db.query('SELECT user_id FROM bookings WHERE id = $1', [bookingId]);
            const userId = bookingResult.rows[0].user_id;

            const userResult = await db.query('SELECT phone_number FROM users WHERE id = $1', [userId]);
            let phone = userResult.rows[0].phone_number;

            await db.query('UPDATE bookings SET status = $1 WHERE id = $2', [status, bookingId]);

            // SMS logic remains the same...
            res.status(200).json({ message: 'Status updated!' });
        } catch (error) {
            res.status(500).json({ message: 'Update failed.' });
        }
    });

    return router;
};

module.exports = createAdminRoutes;