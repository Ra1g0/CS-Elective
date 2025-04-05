import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './AdminContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminRoute from './AdminRoute';
import HomePage from './../Home';
import NotFound from './../components/NotFound'; // Add this import

function AdminRoutes() { // Renamed from App to AdminRoutes
  return (
    <BrowserRouter>
      <AdminProvider>
        <Routes>
          {/* Your public routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          
          {/* Add more protected admin routes as needed */}
          {/* <Route 
            path="/admin/products" 
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            } 
          /> */}
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
}

export default AdminRoutes;