LIVE LINK : https://car-servicing-h5xn.vercel.app/


Vehicle Service Booking Application
This is a full-stack web application for booking and managing vehicle service appointments. It features a modern, single-page user interface, a customer dashboard for managing vehicles and bookings, and a secure admin panel for service management.

Core Features
User Authentication: Secure user registration and login with JWT (JSON Web Tokens).

Customer Dashboard: A private dashboard for logged-in users to:

Add and manage their personal vehicles.

Book new service appointments.

View their booking history and track the live status of their service.

Admin Dashboard: A secure, role-protected dashboard for the service company to:

View all bookings from all customers.

Update the status of any service (e.g., "Booking Confirmed" -> "Service In Progress").

SMS Notifications: Automatic SMS updates are sent to customers via Twilio whenever their booking status is changed by an admin.

Technology Stack
Frontend: React (Create React App), axios, react-scroll

Backend: Node.js, Express.js

Database: MySQL

Authentication: JWT (JSON Web Tokens), bcryptjs

Notifications: Twilio API for SMS

Deployment:

Frontend hosted on Vercel/Netlify.

Backend and Database hosted on Render.

Setup and Installation
Prerequisites
Node.js and npm

A running MySQL server

A Twilio account with credentials

1. Backend Setup
Navigate to the backend directory:



cd backend
Install the required packages:



npm install
Create a .env file in the backend root and add your credentials:



DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=vehicle_service
PORT=3001
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
Set up the database by running the SQL schema script in your MySQL tool.

Start the backend server:



npm start
The server will be running at http://localhost:3001.

2. Frontend Setup
Open a new terminal and navigate to the frontend directory:



cd frontend
Install the required packages:



npm install
Start the frontend application:


npm start
The application will open in your browser at http://localhost:3000.

Application Flow
A new user registers and logs in.

The user is redirected to their dashboard, where they can add a vehicle.

The user books a service for their vehicle.

An admin logs in using the special admin login and navigates to the admin dashboard.

The admin sees the new booking and updates its status.

Upon the status update, the user receives an automatic SMS notification.
