// 1. Import Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const createAuthRoutes = require('./routes/authRoutes');
const createVehicleRoutes = require('./routes/vehicleRoutes'); 
const createBookingRoutes = require('./routes/bookingRoutes'); 
const createAdminRoutes = require('./routes/adminRoutes'); // 1. ADD THIS IMPORT

// 2. Set up Express App
const app = express();
const PORT = process.env.PORT || 3001;

// 3. Set up Middleware
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json());

// 4. Create a MySQL Connection Pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

// 5. Define Routes
// Test route
app.get('/api/test-db', async (req, res) => {
    try {
        const [results] = await db.query('SELECT 1');
        res.status(200).json({ success: true, message: 'Database connection successful!' });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ success: false, message: 'Database connection failed.' });
    }
});

// Use the authentication routes
const authRoutes = createAuthRoutes(db);
app.use('/api/auth', authRoutes);

// Use the vehicle routes
const vehicleRoutes = createVehicleRoutes(db);
app.use('/api/vehicles', vehicleRoutes);

// Use the booking routes
const bookingRoutes = createBookingRoutes(db);
app.use('/api/bookings', bookingRoutes); 

// Use the admin routes
const adminRoutes = createAdminRoutes(db);      // 2. ADD THIS LINE
app.use('/api/admin', adminRoutes);

// 6. Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

