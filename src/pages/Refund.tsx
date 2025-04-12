import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState } from "react";
import BadgeBallpen from "../assets/BadgeBallpen.png"; // Replace with your image URL

function Refund() {
  const location = useLocation(); // Access the location object
  const product = location.state; // Extract the product data from the state
  const [activeMenu, setActiveMenu] = useState("profile"); // Initialize activeMenu state
  const navigate = useNavigate(); // Initialize navigate
  const [reason, setReason] = useState(""); // State for selected reason
  const [solution, setSolution] = useState("refund-only"); // State for solution toggle
  const [shippingOption, setShippingOption] = useState("pick-up"); // State for shipping option toggle

  const handleSubmit = () => {
    if (!reason) {
      alert("Please select a reason for the refund.");
      return;
    }
    navigate("/submitrefund");
  };

  return (
    <div className="relative bg-white min-h-screen" style={{ fontFamily: '"TT Firs Text Trial Light", sans-serif' }}>
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
          <h1 className="text-2xl font-bold mb-4">Refund Page</h1>
          {product ? (
            <div className="bg-pink-200 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-4">My Order</h2>

              {/* White Container */}
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                {/* Reason and Description */}
                <div className="flex justify-between mb-6">
                  <div className="flex-1 mr-6">
                    <label className="block text-lg font-semibold mb-2">Reason:</label>
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    >
                      <option value="">Select a reason</option>
                      <option value="damaged">Damaged Product</option>
                      <option value="wrong-item">Wrong Item Delivered</option>
                      <option value="not-as-described">Not as Described</option>
                      <option value="other">Other</option>
                    </select>
                    <label className="block text-lg font-semibold mt-4">Description:</label>
                    <textarea
                      className="w-full p-2 border rounded-lg"
                      placeholder="Provide additional details..."
                    ></textarea>
                  </div>

                  {/* Refund Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-8">Refund Details:</h3>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Refund Amount:</span> {product.price} Pesos
                    </p>
                    <p className="text-sm mb-2 mt-20">
                      <span className="font-semibold">Refund To:</span> GCash
                    </p>
                    <p className="text-sm mt-15">
                      <span className="font-semibold">Email:</span> example@email.com
                    </p>
                  </div>
                </div>

                {/* Product Image */}
                <div className="flex justify-center mb-6 mr-230">
                  <img
                    src={BadgeBallpen} // Replace with your image URL
                    alt={product.name}
                    className="w-32 h-32 rounded-lg"
                  />
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Solution:</h3>
                  <div className="flex space-x-4">
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        solution === "refund-only"
                          ? "bg-pink-400 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setSolution("refund-only")}
                    >
                      Refund Only
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        solution === "return-and-refund"
                          ? "bg-pink-400 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setSolution("return-and-refund")}
                    >
                      Return and Refund
                    </button>
                  </div>
                </div>

                {/* Shipping Option */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Shipping Option:</h3>
                  <div className="flex space-x-4">
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        shippingOption === "pick-up"
                          ? "bg-pink-400 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setShippingOption("pick-up")}
                    >
                      Pick Up
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        shippingOption === "drop-off"
                          ? "bg-pink-400 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setShippingOption("drop-off")}
                    >
                      Drop Off
                    </button>
                  </div>
                </div>

                  {/* Submit Button */}
                  <div className="text-right">
                  <button
                    className="bg-pink-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-pink-500"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-red-500">No product data available.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Refund;