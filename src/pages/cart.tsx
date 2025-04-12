import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../App.css";

interface MyCartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selected?: boolean;
  selectedColor?: string;
  selectedStyle?: string;
}

function MyCart() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string>("my-cart");
  const [notification] = useState<string | null>(null);


  const [cartItems, setCartItems] = useState<MyCartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? (JSON.parse(storedCart) as MyCartItem[]) : [];
  });

  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleSelectItem = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setCartItems((prev) => prev.map((item) => ({ ...item, selected: checked })));
  };

  const total = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const selectedCount = cartItems.filter((item) => item.selected).length;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    
    <div
      className="relative bg-white min-h-screen"
      style={{ fontFamily: '"TT Firs Text Trial Light", sans-serif' }}
    >
        <div>
            {notification && (
            <div className="fixed bottom-15 left-1/2 transform -translate-x-1/2 bg-pink-300 justify-center border border-pink-700 rounded-lg shadow-md p-4 z-50">
                {notification}
            </div>
            )}
        </div>
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
                        const confirmLogout = window.confirm("Are you sure you want to log out?");
                        if (confirmLogout) {
                            setActiveMenu("logout");
                            localStorage.removeItem("isLoggedIn"); // Clear login status
                            localStorage.removeItem("isAdmin"); // Clear admin status
                            localStorage.removeItem("cart"); // Clear cart
                            navigate("/login", { state: { message: "Logged out successfully!" } });
                        }
                    }}
                    >
                    Log Out
                    <span
                        className={`block h-[2px] w-0 bg-red-500 transition-all group-hover:w-full ${
                        activeMenu === "logout" ? "w-full" : ""
                        }`}
                    >
                    </span>
                </p>
            </div>
        </aside>

        {/* Main Cart Section */}
        <main className="flex-1 p-8">
          <div className="w-full max-w-5xl mx-auto">
            {/* Table Header */}
            <div className="grid grid-cols-7 items-center bg-[#f3c0c8] p-4 rounded-t-lg font-semibold text-sm">
              <div>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </div>
              <div className="col-span-2">Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
              <div>Option</div>
            </div>

            {/* Cart Items - Limited Display with Scroll */}
            <div
              className="max-h-[500px] overflow-y-auto bg-[#f3c0c8] space-y-4 p-4"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#f3c0c8 #fff" }}
            >
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-7 items-center bg-white p-4 border-b rounded-xl"
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={item.selected || false}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </div>
                  <div className="col-span-2 flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-xs text-gray-500">
                        Color: {item.selectedColor}
                      </div>
                      <div className="text-xs text-gray-500 ">
                        Style: {item.selectedStyle}
                      </div>
                    </div>
                  </div>
                  <div>₱{item.price.toFixed(2)}</div>
                  <div className="flex items-center gap-2 bg-pink-200 w-15">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded bg-pink-300"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded bg-pink-300"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-[#D43950] font-semibold ">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div>
                    <button
                      className="text-[#D43950] hover:underline font-semibold"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#EA7B9F] p-4 flex flex-col md:flex-row justify-between items-center gap-4 rounded-b-lg">
              <div className="flex items-center gap-4 text-white">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <span>Select All</span>
                <button
                  onClick={() =>
                    setCartItems((prev) => prev.filter((item) => !item.selected))
                  }
                  className="text-white px-3 py-1 rounded hover:bg-red-500"
                >
                  Delete
                </button>
                <button
                    onClick={() => {
                        navigate("/shop", { state: { filter: "my-likes" } }); // Redirect to shop with "my-likes" filter
                    }}
                    className="text-white px-3 py-1 rounded hover:bg-pink-500"
                    >
                    Move to My Likes
                </button>
              </div>
              <div className="flex items-center gap-4 text-white">
                <span className="font-semibold">
                  Total Item ({selectedCount}): ₱ {total.toFixed(2)}
                </span>
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-[#F8C0CA] text-black px-6 py-2 rounded hover:bg-pink-500 font-bold"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default MyCart;