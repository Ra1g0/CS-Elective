import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import item1 from "../assets/item1.jpeg";
import item2 from "../assets/item2.jpeg";
import item3 from "../assets/item3.jpeg";

function Notifications() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("notifications");

  const parcels = [
    {
      parcelId: "PH2025041201A",
      orderId: "ORD202504A1",
      status: "Parcel delivered",
      date: "24/09/2025 13:52",
      image: item1,
    },
    {
      parcelId: "PH2025041202B",
      orderId: "ORD202504B2",
      status: "Out for delivery",
      date: "24/09/2025 09:15",
      image: item2,
    },
    {
      parcelId: "PH2025041203C",
      orderId: "ORD202504C3",
      status: "Shipped",
      date: "23/09/2025 16:40",
      image: item3,
    },
  ];

  return (
    <div className="relative bg-white min-h-screen" style={{ fontFamily: '"TT Firs Text Trial Light", sans-serif' }}>
      <Header />

      <div className="flex py-20">
        {/* Sidebar */}
        <aside className="w-64 ml-20 p-6 font-semibold text-2xl font-sans">
          <h2 className="text-lg mb-4">Menu</h2>
          <div className="border-b mb-4"></div>
          <div className="space-y-2 text-sm">
            <div>My Account</div>
            <div className="ml-4">
              {[
                { label: "Profile", key: "profile", path: "/profile" },
                { label: "My Order", key: "my-order", path: "/orders" },
                { label: "Account Settings", key: "account-settings", path: "/account-settings" },
              ].map((item) => (
                <p
                  key={item.key}
                  className={`cursor-pointer group px-2 py-1 rounded ${
                    activeMenu === item.key ? "bg-[#F8C0CA]" : ""
                  }`}
                  onClick={() => {
                    setActiveMenu(item.key);
                    navigate(item.path);
                  }}
                >
                  {item.label}
                  <span
                    className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${
                      activeMenu === item.key ? "w-full" : ""
                    }`}
                  ></span>
                </p>
              ))}
            </div>

            {[
              { key: "my-cart", label: "My Cart", path: "/cart" },
              { key: "chat", label: "Chat", path: "/chat" },
              { key: "notifications", label: "Notifications", path: "/notifications" },
            ].map((item) => (
              <p
                key={item.key}
                className={`cursor-pointer group px-2 py-1 rounded ${
                  activeMenu === item.key ? "bg-[#F8C0CA]" : ""
                }`}
                onClick={() => {
                  setActiveMenu(item.key);
                  navigate(item.path);
                }}
              >
                {item.label}
                <span
                  className={`block h-[2px] w-0 bg-pink-500 transition-all group-hover:w-full ${
                    activeMenu === item.key ? "w-full" : ""
                  }`}
                ></span>
              </p>
            ))}

            <p
              className={`cursor-pointer group px-2 py-1 rounded text-red-500 ${
                activeMenu === "logout" ? "bg-[#F8C0CA]" : ""
              }`}
              onClick={() => {
                const confirmLogout = window.confirm("Are you sure you want to log out?");
                if (confirmLogout) {
                  setActiveMenu("logout");
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("isAdmin");
                  localStorage.removeItem("cart");
                  navigate("/login", { state: { message: "Logged out successfully!" } });
                }
              }}
            >
              Log Out
              <span
                className={`block h-[2px] w-0 bg-red-400 transition-all group-hover:w-full ${
                  activeMenu === "logout" ? "w-full" : ""
                }`}
              ></span>
            </p>
          </div>
        </aside>

        {/* Main Notifications Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#F8C0CA] text-center text-lg font-bold py-4 rounded-t-lg">
              Order updates
            </div>

            <div className="space-y-4 bg-[#f3c0c8] p-4 rounded-b-lg">
              {parcels.map((item, index) => (
                <div
                  key={index}
                  className="flex bg-white rounded-xl overflow-hidden shadow-sm relative"
                >
                  <img
                    src={item.image}
                    alt={`Parcel ${item.parcelId}`}
                    className="w-24 h-24 object-cover rounded-l-xl"
                  />
                  <div className="p-4 flex-1 pr-40">
                    <h3 className="font-semibold">{item.status}</h3>
                    <p className="text-sm text-gray-600">
                      Parcel {item.parcelId} for your order {item.orderId} has been{" "}
                      {item.status.toLowerCase()}.
                    </p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>

                  {item.status === "Parcel delivered" ? (
                    <div className="absolute right-4 bottom-4">
                      <button
                        onClick={() => alert("Redirect to product rating")}
                        className="text-sm text-white bg-pink-500 px-3 py-1 rounded hover:bg-pink-600 transition"
                      >
                        Rate the product now
                      </button>
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => alert(`Viewing details for ${item.parcelId}`)}
                        className="p-1 hover:bg-gray-100 rounded-full transition text-sm text-gray-500"
                        title="View Details"
                      >
                        ⋮
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Notifications;
