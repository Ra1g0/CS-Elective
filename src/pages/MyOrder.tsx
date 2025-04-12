import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import BadgeBallpen from "../assets/BadgeBallpen.png"; // Import your image here

function MyOrder() {
  const [activeMenu, setActiveMenu] = useState("my-order"); // Default to "My Order"
  const [showCancelModal, setShowCancelModal] = useState(false); // State for showing the cancel modal
  const [selectedReason, setSelectedReason] = useState(""); // State for selected reason
  const [targetOrder, setTargetOrder] = useState(null); // Track which order is being cancelled
  const navigate = useNavigate(); // Initialize navigate

  // Array of products
  const [products, setProducts] = useState([
    { id: 1, name: "Badge Ballpen", color: "Pink", style: "Personalized", quantity: 2, price: 290, status: "To Pay" },
    { id: 2, name: "Badge Ballpen", color: "Blue", style: "Standard", quantity: 1, price: 150, status: "To Pay" },
    { id: 3, name: "Badge Ballpen", color: "Green", style: "Eco-Friendly", quantity: 3, price: 450, status: "To Pay" },
    { id: 4, name: "Badge Ballpen", color: "Red", style: "Premium", quantity: 5, price: 750, status: "Completed" },
    { id: 5, name: "Badge Ballpen", color: "Yellow", style: "Limited Edition", quantity: 4, price: 600, status: "Completed" },
  ]);

  const handleCancelSubmit = () => {
    if (!selectedReason) {
      alert("Please select a reason for cancellation.");
      return;
    }
    // Update the status of the targeted product
    const updatedProducts = products.map((product, index) =>
      index === targetOrder ? { ...product, status: "Cancelled" } : product
    );
    setProducts(updatedProducts);
    setShowCancelModal(false); // Close the modal
    setSelectedReason(""); // Reset the selected reason
  };

  const handleRefund = (product) => {
    navigate("/refund", { state: product }); // Navigate to /refund with product data
  };
  

  return (
    <div
      className="relative bg-white min-h-screen"
      style={{ fontFamily: '"TT Firs Text Trial Light", sans-serif' }}
    >
    
      <Header />

      <div className="flex py-50">
        {/* Sidebar */}
        <aside className="w-64 ml-20 p-6 font-semibold text-2xl font-sans">
          <h2 className="text-lg mb-4">Menu</h2>
          <div className="border-b mb-4"></div>
          <div className="space-y-2 text-sm">
            <div>My Account</div>
            <div className="ml-4">
              <p
                className={`cursor-pointer group px-2 py-1 rounded ${
                  activeMenu === "profile" ? "bg-[#F8C0CA]" : ""
                }`}
                onClick={() => {
                  setActiveMenu("profile");
                  navigate("/profile");
                }}
              >
                Profile
                <span
                  className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${
                    activeMenu === "profile" ? "w-full" : ""
                  }`}
                ></span>
              </p>
              <p
                className={`cursor-pointer group px-2 py-1 rounded ${
                  activeMenu === "my-likes" ? "bg-[#F8C0CA]" : ""
                }`}
                onClick={() => {
                  setActiveMenu("my-likes");
                  navigate("/shop", { state: { filter: "my-likes" } });
                }}
              >
                My Likes
                <span
                  className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${
                    activeMenu === "my-likes" ? "w-full" : ""
                  }`}
                ></span>
              </p>
              <p
                className={`cursor-pointer group px-2 py-1 rounded ${
                  activeMenu === "my-order" ? "bg-[#F8C0CA]" : ""
                }`}
                onClick={() => {
                  setActiveMenu("my-order");
                  navigate("/orders");
                }}
              >
                My Order
                <span
                  className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${
                    activeMenu === "my-order" ? "w-full" : ""
                  }`}
                ></span>
              </p>
              <p
                className={`cursor-pointer group px-2 py-1 rounded ${
                  activeMenu === "account-settings" ? "bg-[#F8C0CA]" : ""
                }`}
                onClick={() => {
                  setActiveMenu("account-settings");
                  navigate("/account-settings");
                }}
              >
                Account Settings
                <span
                  className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${
                    activeMenu === "account-settings" ? "w-full" : ""
                  }`}
                ></span>
              </p>
            </div>
            <p
              className={`cursor-pointer group px-2 py-1 rounded ${
                activeMenu === "my-cart" ? "bg-[#F8C0CA]" : ""
              }`}
              onClick={() => {
                setActiveMenu("my-cart");
                navigate("/cart");
              }}
            >
              My Cart
              <span
                className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${
                  activeMenu === "my-cart" ? "w-full" : ""
                }`}
              ></span>
            </p>
            <p
              className={`cursor-pointer group px-2 py-1 rounded ${
                activeMenu === "chat" ? "bg-[#F8C0CA]" : ""
              }`}
              onClick={() => {
                setActiveMenu("chat");
                navigate("/chat");
              }}
            >
              Chat
              <span
                className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${
                  activeMenu === "chat" ? "w-full" : ""
                }`}
              ></span>
            </p>
            <p
              className={`cursor-pointer group px-2 py-1 rounded ${
                activeMenu === "notifications" ? "bg-[#F8C0CA]" : ""
              }`}
              onClick={() => {
                setActiveMenu("notifications");
                navigate("/notifications");
              }}
            >
              Notifications
              <span
                className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${
                  activeMenu === "notifications" ? "w-full" : ""
                }`}
              ></span>
            </p>
            <p
              className={`cursor-pointer group px-2 py-1 rounded text-red-500 ${
                activeMenu === "logout" ? "bg-[#F8C0CA]" : ""
              }`}
              onClick={() => {
                const confirmLogout = window.confirm(
                  "Are you sure you want to log out?"
                );
                if (confirmLogout) {
                  setActiveMenu("logout");
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("isAdmin");
                  localStorage.removeItem("cart");
                  navigate("/login", {
                    state: { message: "Logged out successfully!" },
                  });
                }
              }}
            >
              Log Out
              <span
                className={`block h-[2px] w-0 bg-red-500 transition-all group-hover:w-full ${
                  activeMenu === "logout" ? "w-full" : ""
                }`}
              ></span>
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {products.map((product, index) => (
            <div key={product.id} className="bg-pink-200 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-4">My Order</h2>

              {/* White Container */}
              <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
                {/* Image */}
                <img
                  src={BadgeBallpen} // Replace with your image URL
                  alt={product.name}
                  className="w-24 h-24 rounded-lg mr-4"
                />

                {/* Text Content */}
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Color: {product.color}
                    <br />
                    Style: {product.style}
                  </p>
                </div>

                {/* Right-Aligned Content */}
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold mb-2 ${
                      product.status === "Cancelled" ? "text-red-500" : product.status === "Completed" ? "text-green-500" : "text-pink-500"
                    }`}
                  >
                    {product.status}
                  </p>
                  <p className="text-sm text-gray-500 font-semibold mb-2">Quantity: {product.quantity}</p>
                  <p className="text-2xl text-pink-300 mb-4">{product.price} Pesos</p>

                  {/* Buttons */}
                  <div className="flex space-x-4">
                    {product.status === "Completed" ? (
                      <>
                        <button
                          className="bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500"
                          onClick={() => handleRefund(product)} // Navigate to Refund page
                        >
                          Return/Refund
                        </button>
                        <button className="bg-green-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500">
                          Buy Again
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="bg-pink-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-500">
                          Contact Love, Rivi
                        </button>
                        <button
                          className="bg-pink-300 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-400"
                          onClick={() => {
                            setTargetOrder(index); // Set the targeted order
                            setShowCancelModal(true); // Show the modal
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Cancel Modal */}
       {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Reason for Cancellation</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reason"
                  value="Change my mind"
                  className="mr-2"
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                Change my mind
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reason"
                  value="Found a better souvenir"
                  className="mr-2"
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                Found a better souvenir
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reason"
                  value="Need to change address"
                  className="mr-2"
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                Need to change address
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reason"
                  value="Need to order (quantity, color, etc.)"
                  className="mr-2"
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                Need to order (quantity, color, etc.)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reason"
                  value="No longer needed"
                  className="mr-2"
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                No longer needed
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reason"
                  value="Order by mistake"
                  className="mr-2"
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                Order by mistake
              </label>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => {
                  setShowCancelModal(false); // Close the modal
                  setSelectedReason(""); // Reset the selected reason
                }}
              >
                Close
              </button>
              <button
                className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500"
                onClick={handleCancelSubmit} // Submit cancellation
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default MyOrder;