import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProductManagement from './ProductManagement';

function AdminDashboard() {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-[#f393ae] p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button 
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Product Management</h2>
            <ProductManagement />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;