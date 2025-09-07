// frontend/src/components/auth/AdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = () => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.is_admin) {
                return <Outlet />;
            }
        } catch (error) {
            return <Navigate to="/login" replace />;
        }
    }
    
    return <Navigate to="/dashboard" replace />; 
};

export default AdminRoute;