const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const createVehicleRoutes = (db) => {
    const router = express.Router();

    router.post('/add', protect, async (req, res) => {
        try {
            const { make, model, registration_number } = req.body;
            const userId = req.userId;

            const query = 'INSERT INTO vehicles (user_id, make, model, registration_number) VALUES ($1, $2, $3, $4)';
            await db.query(query, [userId, make, model, registration_number]);
            
            res.status(201).json({ message: 'Vehicle added!' });
        } catch (error) {
            res.status(500).json({ message: 'Error adding vehicle.' });
        }
    });

    router.get('/', protect, async (req, res) => {
        try {
            const userId = req.userId;
            const result = await db.query('SELECT id, make, model, registration_number FROM vehicles WHERE user_id = $1', [userId]);
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching vehicles.' });
        }
    });

    return router;
};

module.exports = createVehicleRoutes;