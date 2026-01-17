🚗 Car Servicing Management System
A production-ready Full-Stack (PERN) application built to automate car service bookings, manage vehicle records, and provide real-time status tracking for both customers and administrators.

🚀 Live DemoFrontend: https://car-service-fawn-gamma.vercel.app
Backend: https://carservicing.onrender.com

🛠️ Tech Stack 
Layer       Technology
Frontend    React.js, Tailwind CSS, Axios, React Router
Backend     Node.js, Express.js
Database    PostgreSQL
Auth        JSON Web Tokens (JWT), Bcrypt.js
Deployment  Vercel (Frontend), Render (Backend)

🔑 Credentials for TestingTo explore the application without creating a new account, you can use the following credentials:Admin AccessEmail: admin@gmail.comPassword: 123456Customer AccessNew User: Please use the Signup page to create a unique account.Note: During signup, provide a valid email and phone number to test the registration flow.✨ Key FeaturesFor CustomersSecure Authentication: JWT-based login and signup with password hashing.Vehicle Enrollment: Seamlessly add vehicle details (Make, Model, Reg No) before booking.Service Selection: Choose from specialized services like Oil Change, Engine Repair, or General Wash.Real-time Progress: Track your vehicle's status from 'Confirmed' to 'Ready for Pickup' through a visual progress bar.For AdministratorsCentralized Dashboard: Monitor all customer bookings in a single, high-level view.Quick Management: Update service statuses via a premium dropdown interface.Business Insights: View statistics for total, active, and completed services at a glance.Search Functionality: Filter bookings by customer name or vehicle registration number.📁 Project StructurePlaintext├── client/                 # React.js Frontend
│   ├── src/
│   │   ├── pages/          # AdminDashboard, Login, Signup, Booking
│   │   ├── components/     # Navbar, ProtectedRoutes
│   │   └── App.js          # Routing logic
├── server/                 # Node.js & Express Backend
│   ├── routes/             # Admin, Booking, Vehicle, and Auth routes
│   ├── middleware/         # Auth verification (protect middleware)
│   └── server.js           # Server entry point & CORS config
└── .env                    # Environment variables (DB_URL, JWT_SECRET)
⚙️ Local InstallationClone the repository:Bashgit clone https://github.com/NandineeNargesh/carServicing.git
cd carServicing
Setup Backend:Bashcd server
npm install
# Create a .env file with your DB credentials
npm start
Setup Frontend:Bashcd ../client
npm install
npm start
👩‍💻 DeveloperNandinee Nargesh Fourth-Year Information Technology Engineering Student Aspiring Software Engineer
