import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Profile page loaded"); 
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [activeMenu, setActiveMenu] = useState<string>("profile");
  const [notification, setNotification] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+63");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("You must log in first.");
      navigate("/login");
    }
  }, [navigate]);

  // Dummy data for the user profile
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    barangay: "",
    address: "",
    dob: "",
    age: "",
    gender: "Female",
    phone: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

// Dummy data for the country options
// added country code options for the dropdown if NEEDED  
  const countryOptions = [
    { name: "Philippines", code: "+63" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "Canada", code: "+1" },
    { name: "Australia", code: "+61" },
  ];
  // notificaiton alert to login if not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("You must log in first.");
      navigate("/login");
      return;
    }
  // Check if the user is logged in and retrieve their profile data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setFormData((prev) => ({
          ...prev,
          email: parsedUser.email || "",
          firstName: " ",
          middleName: " ",
          lastName: "",
          barangay: " ",
          address: " ",
          dob: " ",
          age: "",
          phone: "  ",
        }));
        // If the user is logged in, retrieve their profile data from localStorage
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setUser({ email: "test@example.com" });
        setFormData((prev) => ({
          ...prev,
          email: "test@example.com",
          firstName: " ",
          middleName: " ",
          lastName: "",
          barangay: " ",
          address: " ",
          dob: " ",
          age: "",
          phone: "  ",
        }));
      }
      // If the user is logged in, retrieve their profile data from localStorage
    } else {
      const userEmail = localStorage.getItem("userEmail") || "test@example.com";
      setUser({ email: userEmail });
      setFormData((prev) => ({
        ...prev,
        email: userEmail,
        firstName: " ",
          middleName: " ",
          lastName: "",
          barangay: " ",
          address: " ",
          dob: " ",
          age: "",
          phone: "  ",
      }));
    }
  }, [navigate]);
// Check if the user is logged in and retrieve their profile data from localStorage
  useEffect(() => {
    if (location.state?.message) {
      setNotification(location.state.message);
      setTimeout(() => setNotification(null), 3000);
    }
  }, [location.state]);

// Handle form data changes
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(formData));
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
// Handle logout confirmation and clear localStorage
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
//
  return (
    <div className="relative bg-white min-h-screen" style={{ fontFamily: '"TT Firs Text Trial Light", sans-serif' }}>
      {notification && (
        <div className="fixed bottom-15 left-1/2 transform -translate-x-1/2 bg-pink-300 justify-center border border-pink-700 rounded-lg shadow-md p-4 z-50">
          {notification}
        </div>
      )}

      <Header />
        {/* Side Menu */}
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
              {activeMenu === "account-settings" ? "Account Settings" : "Profile"}
            </h3>
            <div className="text-sm text-gray-800">
              {user ? (
                <>
                  {activeMenu === "profile" && (
                    <section
                      aria-label="Profile form"
                      className="flex flex-col md:flex-row md:items-start md:gap-8"
                    >
                      {/* Profile Form */}
                      <div className="flex-1">
                        <form className="space-y-4" onSubmit={handleSave}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                             {/* firstName Form */}
                              <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="p-3 rounded-md border w-full bg-white border-gray-300 shadow-sm "
                              />
                              {/* middleName Form */}
                              <input
                                type="text"
                                name="middleName"
                                placeholder="Middle Name"
                                className="p-3 rounded-md border w-full bg-white border-gray-300 shadow-sm "
                              />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                           {/* lastName Form */}
                              <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="p-3 rounded-md border w-full bg-white border-gray-300 shadow-sm "
                              />
                            </div>
                            {/* Landmark Form */}
                            <div className="flex flex-col">
                              <input
                                type="text"
                                name="barangay"
                                placeholder="Landmark"
                                className="p-3 rounded-md border w-full bg-white border-gray-300 shadow-sm "
                                />
                              <p className="text-[#D43950] text-s mt-1">
                                Nearest Landmark (Optional)
                              </p>
                            </div>
                          </div>
                          <div>
                            {/* Address Form */}
                            <input
                              type="text"
                              name="address"
                              placeholder="Address"
                              className="p-3 rounded-md border w-full bg-white border-gray-300 shadow-sm "
                              />
                            <p className="text-[#D43950] text-s mt-1">
                                    House No., Street...
                            </p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                             {/* date Form */}
                              <input
                                type="date"
                                name="dob"
                                className="p-3 rounded-md border w-full bg-white border-gray-300 shadow-sm "
                              />
                              {/* age Form */}
                              <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                className="p-3 rounded-md border w-full bg-white border-gray-300 shadow-sm "
                                />
                              {/* gender Form */}
                              <select
                                name="gender"
                                 className="p-3 rounded-md border w-full bg-white border-gray-300 shadow-sm "
                              >
                                <option value="choose">. . .</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other/They/Them</option>
                              </select>
                          </div>
                          {/* Contact Form */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[#D43950]">Country Code</label>
                              <select
                                value={selectedCountryCode}
                                onChange={(e) => setSelectedCountryCode(e.target.value)}
                                className="p-3 rounded-md border w-full bg-white border-gray-300 shadow-sm "
                                >
                                {countryOptions.map((country) => (
                                  <option key={country.code} value={country.code}>
                                    {country.code} {country.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* Mobile Number Form */}
                            <div className="sm:col-span-2">
                              <label className="block text-sm font-medium text-[#D43950]">Mobile Number</label>
                              <input
                                type="tel"
                                name="phone"
                                placeholder="Mobile Number"
                                className="p-3 rounded-md border w-full bg-white border-gray-300 shadow-sm "
                                />
                            </div>
                          </div>
                          {/* Email Address Form */}
                          <div>
                            <label className="block text-sm font-medium text-[#D43950]">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="Email Address"
                              className="p-3 rounded-md border w-full bg-white border-gray-300 shadow-sm "
                                />
                          </div>
                          <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
                            <button
                              type="submit"
                              className="bg-pink-400 hover:bg-pink-600 text-white text-xs font-bold px-6 py-2 rounded transition duration-300"
                            >
                            {/* SAVE Form */}
                              SAVE
                            </button>
                            {showConfirmation && (
                              <span className="bg-pink-300 text-black text-xs font-bold rounded-full px-4 py-2 mt-2 sm:mt-0 ml-2">
                                Changes Saved!
                              </span>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Profile Image Upload */}
                      <div className="flex-shrink-0 md:w-24 md:flex md:flex-col md:items-center mt-6 md:mt-0">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="rounded-full w-20 h-20 object-cover"
                          />
                        ) : (
                          <div className="rounded-full w-20 h-20 flex items-center justify-center bg-white border border-gray-300 shadow-sm ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.121 17.804A12.042 12.042 0 0112 15c2.489 0 4.797.755 6.879 2.051M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                        )}
                        <label className="block w-full mt-2 cursor-pointer text-center text-xs font-light text-[#D43950]">
                          Edit
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </section>
                  )}
                  
                </>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;