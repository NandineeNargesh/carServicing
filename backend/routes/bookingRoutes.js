const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const createBookingRoutes = (db) => {
    const router = express.Router();

    router.post('/create', protect, async (req, res) => {
        try {
            const { vehicle_id, service_type, booking_date, time_slot } = req.body;
            const userId = req.userId;

            if (!vehicle_id || !service_type || !booking_date || !time_slot) {
                return res.status(400).json({ message: 'Please provide all details.' });
            }

            const query = 'INSERT INTO bookings (user_id, vehicle_id, service_type, booking_date, time_slot) VALUES ($1, $2, $3, $4, $5)';
            await db.query(query, [userId, vehicle_id, service_type, booking_date, time_slot]);
            
            res.status(201).json({ message: 'Booking created successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error while creating booking.' });
        }
    });

    router.get('/history', protect, async (req, res) => {
        try {
            const userId = req.userId;
            const query = `
                SELECT b.id, b.service_type, b.booking_date, b.time_slot, b.status, v.make, v.model
                FROM bookings AS b
                JOIN vehicles AS v ON b.vehicle_id = v.id
                WHERE b.user_id = $1
                ORDER BY b.booking_date DESC
            `;
            const result = await db.query(query, [userId]);
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching history.' });
        }
    });

    return router;
};

module.exports = createBookingRoutes;