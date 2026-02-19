# 🚗 Car Servicing Management System  

A **production-ready Full-Stack (PERN)** application designed to streamline car service operations by automating service bookings, managing vehicle records, and enabling real-time status tracking for both **customers and administrators**.  

This system provides a seamless and intuitive experience with secure authentication, role-based access, and an interactive admin dashboard.

---

## 🌐 Live Demo  

🔹 **Frontend:** https://car-service-fawn-gamma.vercel.app  
🔹 **Backend:** https://carservicing.onrender.com  

---

## 🛠️ Tech Stack  

| Layer | Technology |
|------|------------|
| **Frontend** | React.js, Tailwind CSS, Axios, React Router |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **Authentication** | JWT, Bcrypt.js |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🔑 Test Credentials  

### **Admin Access**
-- Email: admin@gmail.com

--Password: 123456


### **Customer Access**
- New users can sign up using the registration page.  
- Please provide a valid email and phone number during signup.

---

## ✨ Key Features  

### **For Customers**
- 🔐 Secure authentication using JWT  
- 🚘 Register and manage multiple vehicles  
- 🛠️ Select from multiple service types:
  - Oil Change  
  - Engine Repair  
  - General Wash  
- 📊 Track service progress in real-time via visual status bar  

### **For Administrators**
- 📋 Centralized dashboard to manage all bookings  
- 🔄 Update service status using an interactive dropdown  
- 📈 View business insights:
  - Total services  
  - Active services  
  - Completed services  
- 🔍 Search bookings by:
  - Customer name  
  - Vehicle registration number  

---






## ⚙️ Local Setup  

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/NandineeNargesh/carServicing.git
cd carServicing

---
setup backend
cd server
npm install
# Create a .env file with DB_URL and JWT_SECRET
npm start

---
setup frontend
cd ../client
npm install
npm start


---=====

### 👩‍💻 Developer

Nandinee Nargesh
📧 Contact: nandineenargesh@example.com

🔗 GitHub: https://github.com/NandineeNargesh
