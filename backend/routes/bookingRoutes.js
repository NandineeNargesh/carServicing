// backend/routes/bookingRoutes.js

const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const createBookingRoutes = (db) => {
    const router = express.Router();

    // === CREATE A NEW BOOKING ENDPOINT ===
    router.post('/create', protect, async (req, res) => {
        try {
            const { vehicle_id, service_type, booking_date, time_slot } = req.body;
            const userId = req.userId;

            if (!vehicle_id || !service_type || !booking_date || !time_slot) {
                return res.status(400).json({ message: 'Please provide all required booking details.' });
            }

            const query = 'INSERT INTO bookings (user_id, vehicle_id, service_type, booking_date, time_slot) VALUES (?, ?, ?, ?, ?)';
            await db.query(query, [userId, vehicle_id, service_type, booking_date, time_slot]);
            
            res.status(201).json({ message: 'Booking created successfully! We will contact you shortly to confirm.' });

        } catch (error) {
            console.error('Create booking error:', error);
            res.status(500).json({ message: 'Server error while creating booking.' });
        }
    });

    // --- ADD THIS MISSING ROUTE ---
    router.get('/history', protect, async (req, res) => {
        try {
            const userId = req.userId;

            const query = `
                SELECT 
                    b.id, 
                    b.service_type, 
                    b.booking_date, 
                    b.time_slot, 
                    b.status, 
                    v.make, 
                    v.model
                FROM bookings AS b
                JOIN vehicles AS v ON b.vehicle_id = v.id
                WHERE b.user_id = ?
                ORDER BY b.booking_date DESC
            `;
            
            const [bookings] = await db.query(query, [userId]);

            res.status(200).json(bookings);

        } catch (error) {
            console.error('Get booking history error:', error);
            res.status(500).json({ message: 'Server error while fetching booking history.' });
        }
    });
    // ----------------------------

    return router;
};

module.exports = createBookingRoutes;