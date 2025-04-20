import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../Components/Footer";
import "../App.css";

// Define interfaces
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  liked: boolean;
  sales: number;
  description: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
}

interface Order {
  id: number;
  customer: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [notification, setNotification] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  
  // Mock users data
  const [users] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", lastLogin: "2025-04-18" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer", lastLogin: "2025-04-19" },
    { id: 3, name: "Admin User", email: "admin@loverivi.com", role: "Admin", lastLogin: "2025-04-20" },
  ]);

  // Mock orders data
  const [orders, setOrders] = useState<Order[]>([
    { id: 1001, customer: "John Doe", date: "2025-04-19", status: "Delivered", total: 1250, items: 2 },
    { id: 1002, customer: "Jane Smith", date: "2025-04-20", status: "Processing", total: 850, items: 1 },
    { id: 1003, customer: "Mark Johnson", date: "2025-04-18", status: "Shipped", total: 2400, items: 3 },
  ]);

  // Dashboard stats
  const [stats, setStats] = useState({
    totalSales: 4500,
    totalOrders: 3,
    totalProducts: 0, // Will be updated from products
    pendingOrders: 1
  });

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
    
    if (!adminStatus) {
      // Redirect non-admin users
      navigate("/login", { state: { message: "Admin access required" } });
      return;
    }
    
    // Load products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);

    // Save orders to localStorage if they don't exist yet
    if (!localStorage.getItem("orders")) {
      localStorage.setItem("orders", JSON.stringify(orders));
    } else {
      // Load orders from localStorage
      const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(storedOrders);
    }

    // Update pending orders count
    updateStats();

  }, [navigate]);

  // Update stats based on current orders
  const updateStats = () => {
    const pendingCount = orders.filter(order => 
      order.status === "Processing").length;
    
    setStats(prevStats => ({
      ...prevStats,
      pendingOrders: pendingCount,
      totalProducts: products.length
    }));
  };

  useEffect(() => {
    updateStats();
  }, [orders, products]);

  // Function to delete a product
  const handleDeleteProduct = (productId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setNotification("Product deleted successfully!");
      setTimeout(() => setNotification(null), 3000);
    }
  };
  
  // Function to update order status
  const handleStatusChange = (orderId: number, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    
    setNotification(`Order #${orderId} status updated to ${newStatus}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  // Function to view order details
  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Function to close order details modal
  const closeOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: '"TT Firs Text Trial Light", sans-serif' }}>
        <header className="bg-white shadow p-4 mb-6">
            <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-pink-500">Love, Rivi Admin</h1>
                <button
                    onClick={() => {
                    localStorage.removeItem("isAdmin");
                    navigate("/login");
                    }}
                    className="text-sm text-pink-600 hover:underline"
                >
                    Logout
                </button>
            </div>
         </header>
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-pink-300 justify-center border border-pink-700 rounded-lg shadow-md p-4 z-50">
          {notification}
        </div>
      )}
      
      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-90vh overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order #{selectedOrder.id} Details</h2>
              <button 
                onClick={closeOrderDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Customer</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-gray-600">Items</p>
                  <p className="font-medium">{selectedOrder.items}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total</p>
                  <p className="font-medium">₱{selectedOrder.total.toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600">Status</p>
                  <div className="flex items-center mt-1">
                    <select 
                      value={selectedOrder.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        // Update the selected order's status
                        setSelectedOrder({...selectedOrder, status: newStatus});
                        // Also update the order in the orders array
                        handleStatusChange(selectedOrder.id, newStatus);
                      }}
                      className="border rounded px-2 py-1"
                    >
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-2">Order Items</h3>
                {/* Mock order items for demonstration */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-pink-200 rounded flex items-center justify-center mr-3">
                        <span className="text-pink-500">🛍️</span>
                      </div>
                      <div>
                        <p className="font-medium">{selectedOrder.id === 1001 ? "Product A" : selectedOrder.id === 1002 ? "Product B" : "Product C"}</p>
                        <p className="text-sm text-gray-500">Quantity: {selectedOrder.id === 1001 ? 2 : selectedOrder.id === 1002 ? 1 : 3}</p>
                      </div>
                    </div>
                    <p className="font-medium">₱{(selectedOrder.total / selectedOrder.items).toFixed(2)}</p>
                  </div>
                  
                  {selectedOrder.items > 1 && (
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-pink-200 rounded flex items-center justify-center mr-3">
                          <span className="text-pink-500">🛍️</span>
                        </div>
                        <div>
                          <p className="font-medium">{selectedOrder.id === 1001 ? "Product D" : "Product E"}</p>
                          <p className="text-sm text-gray-500">Quantity: 1</p>
                        </div>
                      </div>
                      <p className="font-medium">₱{(selectedOrder.total / selectedOrder.items).toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button 
                  onClick={closeOrderDetails}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        
        {/* Admin Tabs */}
        <div className="flex mb-6 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`px-6 py-3 font-medium rounded-t-lg ${activeTab === "dashboard" ? "bg-pink-500 text-white" : "bg-pink-200 text-gray-800"}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 font-medium rounded-t-lg ${activeTab === "products" ? "bg-pink-500 text-white" : "bg-pink-200 text-gray-800"}`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 font-medium rounded-t-lg ${activeTab === "orders" ? "bg-pink-500 text-white" : "bg-pink-200 text-gray-800"}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 font-medium rounded-t-lg ${activeTab === "users" ? "bg-pink-500 text-white" : "bg-pink-200 text-gray-800"}`}
          >
            Users
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-3 font-medium rounded-t-lg ${activeTab === "settings" ? "bg-pink-500 text-white" : "bg-pink-200 text-gray-800"}`}
          >
            Settings
          </button>
        </div>
        
        {/* Dashboard Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Dashboard Overview */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stats Cards */}
                <div className="bg-pink-100 rounded-lg p-6">
                  <h3 className="text-sm text-gray-600">Total Sales</h3>
                  <p className="text-2xl font-bold">₱{stats.totalSales.toLocaleString()}</p>
                </div>
                
                <div className="bg-pink-100 rounded-lg p-6">
                  <h3 className="text-sm text-gray-600">Total Orders</h3>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                
                <div className="bg-pink-100 rounded-lg p-6">
                  <h3 className="text-sm text-gray-600">Total Products</h3>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
                
                <div className="bg-pink-100 rounded-lg p-6">
                  <h3 className="text-sm text-gray-600">Pending Orders</h3>
                  <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-pink-200">
                      <tr>
                        <th className="py-3 px-4 text-left">Order ID</th>
                        <th className="py-3 px-4 text-left">Customer</th>
                        <th className="py-3 px-4 text-left">Date</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Total</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">₱{order.total.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <button 
                              onClick={() => handleViewOrderDetails(order)}
                              className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Products Tab */}
          {activeTab === "products" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Products Management</h2>
                <Link to="/admin/AdminAdd" className="bg-pink-500 text-white px-4 py-2 rounded-lg">
                  Add New Product
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-pink-200">
                    <tr>
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Image</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Price</th>
                      <th className="py-3 px-4 text-left">Sales</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map(product => (
                        <tr key={product.id} className="border-b">
                          <td className="py-3 px-4">{product.id}</td>
                          <td className="py-3 px-4">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-16 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4">₱{product.price.toFixed(2)}</td>
                          <td className="py-3 px-4">{product.sales}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Link 
                                to={`/admin/AdminEdit/${product.id}`}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                              >
                                Edit
                              </Link>
                              <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-gray-500">
                          No products found. Add some products to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Orders Management</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-pink-200">
                    <tr>
                      <th className="py-3 px-4 text-left">Order ID</th>
                      <th className="py-3 px-4 text-left">Customer</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Items</th>
                      <th className="py-3 px-4 text-left">Total</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">{order.items}</td>
                        <td className="py-3 px-4">₱{order.total.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <select 
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="border rounded px-2 py-1 text-sm"
                          >
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <button 
                            onClick={() => handleViewOrderDetails(order)}
                            className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Users Management</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-pink-200">
                    <tr>
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Role</th>
                      <th className="py-3 px-4 text-left">Last Login</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b">
                        <td className="py-3 px-4">{user.id}</td>
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">{user.lastLogin}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded">
                              Edit
                            </button>
                            {user.role !== 'Admin' && (
                              <button className="bg-red-500 text-white px-3 py-1 rounded">
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Admin Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Store Information</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Store Name</label>
                      <input 
                        type="text" 
                        defaultValue="Love, Rivi"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="loverivi28@gmail.com"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="text" 
                        defaultValue="0927 009 2386"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Store Address</label>
                      <textarea 
                        defaultValue="South, Caloocan, Philippines"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        rows={3}
                      ></textarea>
                    </div>
                    
                    <button 
                      type="button"
                      className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                      onClick={() => {
                        setNotification("Store settings updated!");
                        setTimeout(() => setNotification(null), 3000);
                      }}
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Admin Email</label>
                      <input 
                        type="email" 
                        defaultValue="admin@loverivi.com"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Current Password</label>
                      <input 
                        type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">New Password</label>
                      <input 
                        type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Confirm New Password</label>
                      <input 
                        type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    
                    <button 
                      type="button"
                      className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                      onClick={() => {
                        setNotification("Password updated successfully!");
                        setTimeout(() => setNotification(null), 3000);
                      }}
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Admin;