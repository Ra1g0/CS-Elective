import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../App.css"; 

function AccountSettings() {
  const navigate = useNavigate();
 
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [activeMenu, setActiveMenu] = useState<string>("account-settings");
  const [notification] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("You must log in first.");
      navigate("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setUser({ email: "minjeongkim123@email.com" });
      }
    } else {
      const userEmail = localStorage.getItem("userEmail") || "Dummy User";
      setUser({ email: userEmail });
    }
  }, [navigate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      alert("Please fill in all password fields.");
      return;
    }
    
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setActiveMenu("logout");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("cart");
      navigate("/login", { state: { message: "Logged out successfully!" } });
    }
  };

  return (
    <div className="relative bg-white min-h-screen" style={{ fontFamily: '"TT Firs Text Trial Light", sans-serif' }}>
      {notification && (
        <div className="fixed bottom-15 left-1/2 transform -translate-x-1/2 bg-pink-300 justify-center border border-pink-700 rounded-lg shadow-md p-4 z-50">
          {notification}
        </div>
      )}

      <Header />
      <div className="flex py-50">
        <aside className="w-64 ml-20 p-6 font-semibold text-2xl font-sans">
          <h2 className="text-lg mb-4">Menu</h2>
          <div className="border-b mb-4"></div>
          <div className="space-y-2 text-sm">
            <div>My Account</div>
            <div className="ml-4">
              <p
                className={`cursor-pointer group px-2 py-1 rounded ${activeMenu === "profile" ? "bg-[#F8C0CA]" : ""}`}
                onClick={() => {
                  setActiveMenu("profile");
                  navigate("/profile");
                }}
              >
                Profile
                <span className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${activeMenu === "profile" ? "w-full" : ""}`}></span>
              </p>
              <p
                className={`cursor-pointer group px-2 py-1 rounded ${activeMenu === "shop" ? "bg-[#F8C0CA]" : ""}`}
                onClick={() => {
                  setActiveMenu("shop");
                  navigate("/shop");
                }}
              >
                Shop
                <span className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${activeMenu === "shop" ? "w-full" : ""}`}></span>
              </p>
              <p
                className={`cursor-pointer group px-2 py-1 rounded ${activeMenu === "my-order" ? "bg-[#F8C0CA]" : ""}`}
                onClick={() => {
                  setActiveMenu("my-order");
                  navigate("/orders");
                }}
              >
                My Order
                <span className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${activeMenu === "my-order" ? "w-full" : ""}`}></span>
              </p>
              <p
                className={`cursor-pointer group px-2 py-1 rounded ${activeMenu === "account-settings" ? "bg-[#F8C0CA]" : ""}`}
                onClick={() => {
                  setActiveMenu("account-settings");
                  navigate("/account-settings");
                }}
              >
                Account Settings
                <span className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${activeMenu === "account-settings" ? "w-full" : ""}`}></span>
              </p>
            </div>
            <p
              className={`cursor-pointer group px-2 py-1 rounded ${activeMenu === "my-cart" ? "bg-[#F8C0CA]" : ""}`}
              onClick={() => {
                setActiveMenu("my-cart");
                navigate("/cart");
              }}
            >
              My Cart
              <span className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${activeMenu === "my-cart" ? "w-full" : ""}`}></span>
            </p>
            <p
              className={`cursor-pointer group px-2 py-1 rounded ${activeMenu === "notifications" ? "bg-[#F8C0CA]" : ""}`}
              onClick={() => {
                setActiveMenu("notifications");
                navigate("/notifications");
              }}
            >
              Notifications
              <span className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${activeMenu === "notifications" ? "w-full" : ""}`}></span>
            </p>
            <p
              className={`cursor-pointer group px-2 py-1 rounded text-red-500 ${activeMenu === "logout" ? "bg-[#F8C0CA]" : ""}`}
              onClick={handleLogout}
            >
              Log Out
              <span className={`block h-[2px] w-0 bg-red-500 transition-all group-hover:w-full ${activeMenu === "logout" ? "w-full" : ""}`}></span>
            </p>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <section className="bg-[#F8C0CA] rounded-xl p-4 md:p-8 w-full max-w-5xl mx-auto">
            <h3 className="text-black font-semibold mb-6 text-lg md:text-xl">
              Account Settings
            </h3>
            <div className="text-sm text-gray-800">
              {activeMenu === "account-settings" && (
                <>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-black mb-1">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="p-3 pr-20 rounded-md border w-full bg-white text-gray-800"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-pink-600 text-sm font-medium cursor-pointer"
                        >
                          change
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black mb-1">Password</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Current Password"
                            className="p-3 rounded-md border w-full bg-white text-gray-800 pr-10"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                          <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 text-xl"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="New Password"
                            className="p-3 rounded-md border w-full bg-white text-gray-800 pr-10"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 text-xl"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs mt-2">
                        <a href="#forgot-password" className="text-pink-500 hover:text-pink-600">
                          Forgot Password?
                        </a>
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="bg-pink-400 hover:bg-pink-600 text-white text-xs font-bold px-6 py-2 rounded transition duration-300"
                      onClick={handleSave}
                    >
                      SAVE
                    </button>
                  </form>
                  <hr className="border-gray-600 my-6" />
                  <h5 className="text-sm font-semibold text-black uppercase">Delete Account</h5>
                  <p className="text-gray-900 text-sm mt-2">
                    Would you like to delete your account? Deleting your account will remove all the content associated with it.
                  </p>
                  <button
                    type="button"
                    className="text-pink-500 hover:text-pink-600 text-sm font-medium mt-2"
                  >
                    Delete Account
                  </button>
                </>
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AccountSettings;
