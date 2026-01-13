// 1. Import Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Changed from mysql2 to pg
const createAuthRoutes = require('./routes/authRoutes');
const createVehicleRoutes = require('./routes/vehicleRoutes'); 
const createBookingRoutes = require('./routes/bookingRoutes'); 
const createAdminRoutes = require('./routes/adminRoutes');

// 2. Set up Express App
const app = express();
const PORT = process.env.PORT || 3001;

// 3. Set up Middleware
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json());

// 4. Create a PostgreSQL Connection Pool
const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
    ssl: { rejectUnauthorized: false } // Required for Render/Cloud DBs
});

// 5. Define Routes
// Test route to confirm connection
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.status(200).json({ success: true, message: 'PostgreSQL connection successful!', time: result.rows[0] });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ success: false, message: 'Database connection failed.', error: error.message });
    }
});

// Use the routes
app.use('/api/auth', createAuthRoutes(db));
app.use('/api/vehicles', createVehicleRoutes(db));
app.use('/api/bookings', createBookingRoutes(db)); 
app.use('/api/admin', createAdminRoutes(db));

// 6. Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});