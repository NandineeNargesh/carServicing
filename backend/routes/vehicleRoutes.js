const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const createVehicleRoutes = (db) => {
    const router = express.Router();

    // === ADD A NEW VEHICLE ===
    router.post('/add', protect, async (req, res) => {
        try {
            const { make, model, registration_number } = req.body;
            const userId = req.userId;

            if (!make || !model || !registration_number) {
                return res.status(400).json({ message: 'Please provide all vehicle details.' });
            }

            const query = 'INSERT INTO vehicles (user_id, make, model, registration_number) VALUES (?, ?, ?, ?)';
            await db.query(query, [userId, make, model, registration_number]);
            
            res.status(201).json({ message: 'Vehicle added successfully!' });
        } catch (error) {
            console.error('Add vehicle error:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'A vehicle with this registration number already exists.' });
            }
            res.status(500).json({ message: 'Server error while adding vehicle.' });
        }
    });

    // === GET ALL VEHICLES FOR A USER ===
    router.get('/', protect, async (req, res) => {
        try {
            const userId = req.userId;
            const query = 'SELECT id, make, model, registration_number FROM vehicles WHERE user_id = ?';
            const [vehicles] = await db.query(query, [userId]);
            res.status(200).json(vehicles);
        } catch (error) {
            console.error('Get vehicles error:', error);
            res.status(500).json({ message: 'Server error while fetching vehicles.' });
        }
    });

    return router;
};

module.exports = createVehicleRoutes;