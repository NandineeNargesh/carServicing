# Vehicle Service Booking Application 🚗🛠️

🌐 **Live Demo:**  
👉 https://car-servicing-h5xn.vercel.app/

---

## 📌 About the Project
A full-stack web application for booking and managing **vehicle service appointments**.  
The platform includes a **customer dashboard** for vehicle management, a **secure admin panel** for service management, and **real-time notifications via SMS and email**.  
Built to simulate a modern, professional service booking system.

---

## ✨ Core Features

### User Features
- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens)  
- **Customer Dashboard:**
  - Add and manage personal vehicles
  - Book new service appointments
  - View booking history and track live service status

### Admin Features
- **Admin Dashboard:** Secure, role-protected panel for the service company
  - View all customer bookings
  - Update booking/service status (e.g., "Booking Confirmed" → "Service In Progress")

### Notifications
- **SMS Notifications:** Customers receive automatic SMS updates via Twilio whenever booking status changes
- **Email Notifications:** Customers can also receive updates through email (if configured)

---

## 🛠️ Technology Stack

### Frontend
- React (Create React App)  
- Axios  
- react-scroll

### Backend
- Node.js  
- Express.js  

### Database
- MySQL  

### Authentication & Security
- JWT (JSON Web Tokens)  
- bcryptjs  

### Notifications
- Twilio API (SMS)  
- Email service (SMTP / nodemailer)

### Deployment
- Frontend: Vercel / Netlify  
- Backend & Database: Render

---


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
 
 
---

# Application Flow

A new user registers and logs in.

The user is redirected to their dashboard, where they can add a vehicle.

The user books a service for their vehicle.

An admin logs in using the special admin login and navigates to the admin dashboard.

The admin sees the new booking and updates its status.

Upon the status update, the user receives an automatic SMS notification.
