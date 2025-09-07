// frontend/src/pages/DashboardPage.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';

function DashboardPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
    </div>
  );
}

export default DashboardPage;