require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const vehicleRoutes = require('./routes/vehicleRoutes');
const { protect } = require("./middleware/authMiddleware");  // ✅ USE THIS
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://car-service-fawn-gamma.vercel.app' // 👈 Aapka copied link
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// --- Admin middleware ---
const isAdmin = (req, res, next) => {
  if (!req.is_admin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};


const handleBookNow = (service) => {
  const token = localStorage.getItem('token'); // Check karein ki user logged in hai ya nahi

  if (!token) {
    // Agar token nahi hai, toh use Signup/Login par bhej dein
    alert("Please Login first to book a service!");
    navigate('/signup'); 
  } else {
    // Agar token hai, toh booking page ya vehicle form par bhej dein
    navigate('/add-vehicle', { state: { service } });
  }
};

// ====== AUTH SIGNUP (New Route with Phone Number) ======
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // 1. Check if user already exists
    const existingUser = await db.query(
      "SELECT * FROM public.users WHERE email = $1", 
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // 2. Hash the password (using bcrypt which you already imported)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert user into Database (including phone_number)
    const newUser = await db.query(
      `INSERT INTO public.users (name, email, password, phone_number, is_admin) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, name, email, is_admin`,
      [name, email, hashedPassword, phone, false] // default is_admin is false
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0]
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// ====== AUTH LOGIN (KEEP YOURS AS IS) ======

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await db.query(
      "SELECT * FROM public.users WHERE email=$1",
      [email]
    );

    if (!userResult.rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ====== VEHICLE ROUTES (MOST IMPORTANT LINE) ======
app.use("/api/admin", adminRoutes(db));
app.use("/api/vehicles", protect, vehicleRoutes(db));  // ✅ CORRECT
app.use("/api/bookings", protect, bookingRoutes(db));
// ====== BOOKING ROUTE (already fine) ======

app.post('/api/bookings/create', protect, async (req, res) => {
  try {
    const { vehicle_id, service_type, booking_date, time_slot } = req.body;

    await db.query(
      `INSERT INTO bookings 
       (user_id, vehicle_id, service_type, booking_date, time_slot)
       VALUES ($1, $2, $3, $4, $5)`,
      [req.userId, vehicle_id, service_type, booking_date, time_slot]
    );

    res.json({ message: "Service booked successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Booking failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
