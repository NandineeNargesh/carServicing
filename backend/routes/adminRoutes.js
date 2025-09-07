const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const createAdminMiddleware = require('../middleware/adminMiddleware');
const twilio = require('twilio');

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const createAdminRoutes = (db) => {
    const router = express.Router();
    const isAdmin = createAdminMiddleware(db);

    // === GET ALL BOOKINGS (ADMIN ONLY) ===
    router.get('/bookings', protect, isAdmin, async (req, res) => {
        try {
            // This is the corrected query to fetch all booking details
            const query = `
                SELECT 
                    b.id, b.service_type, b.booking_date, b.time_slot, b.status, 
                    u.name AS user_name, u.email,
                    v.make, v.model, v.registration_number
                FROM bookings AS b
                JOIN users AS u ON b.user_id = u.id
                JOIN vehicles AS v ON b.vehicle_id = v.id
                ORDER BY b.booking_date DESC;
            `;
            const [bookings] = await db.query(query);
            res.status(200).json(bookings);
        } catch (error) {
            console.error("Get all bookings error:", error);
            res.status(500).json({ message: 'Server error while fetching bookings.' });
        }
    });

    // === UPDATE A BOOKING'S STATUS (ADMIN ONLY) ===
    router.put('/bookings/:id/status', protect, isAdmin, async (req, res) => {
        try {
            const { status } = req.body;
            const bookingId = req.params.id;

            if (!status) {
                return res.status(400).json({ message: 'Status is required.' });
            }

            const [bookings] = await db.query('SELECT user_id FROM bookings WHERE id = ?', [bookingId]);
            if (bookings.length === 0) {
                return res.status(404).json({ message: 'Booking not found.' });
            }
            
            const userId = bookings[0].user_id;
            const [users] = await db.query('SELECT phone_number FROM users WHERE id = ?', [userId]);
            let userPhoneNumber = users[0].phone_number;

            // Format phone number for Twilio
            if (!userPhoneNumber.startsWith('+')) {
                if (userPhoneNumber.startsWith('0')) {
                    userPhoneNumber = userPhoneNumber.substring(1);
                }
                userPhoneNumber = `+91${userPhoneNumber}`;
            }

            // Update status in database
            const updateQuery = 'UPDATE bookings SET status = ? WHERE id = ?';
            await db.query(updateQuery, [status, bookingId]);

            // Send SMS notification
            const messageBody = `Update from CarsServices: Your service status is now "${status}".`;
            
            await twilioClient.messages.create({
                body: messageBody,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: userPhoneNumber
            });
            
            res.status(200).json({ message: 'Booking status updated and notification sent!' });

        } catch (error) {
            console.error("Update status or SMS error:", error); 
            res.status(500).json({ message: 'Server error while updating status.' });
        }
    });

    return router;
};

module.exports = createAdminRoutes;