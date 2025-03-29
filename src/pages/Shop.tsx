import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import "../App.css";
import { useState, useMemo, useEffect } from "react";

function Shop() {
  // Check if the user is logged in using localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    checkLoginStatus();
  }, []);

  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    liked: boolean;
    sales: number;
    description: string;
  }

  // Product List
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "15 oz Mug", price: 250.0, image: "/src/assets/shop/products/mugs/mug1.jpeg", liked: false, sales: 100, description: "A high-quality 15 oz ceramic mug, perfect for coffee lovers." },
    { id: 2, name: "Badge Pen", price: 100.0, image: "/src/assets/shop/products/Badge Pens/badge3.jpeg", liked: false, sales: 250, description: "These pens are perfect for birthdays, thank-you gifts, or any occasion that calls for a personal touch." },
    { id: 3, name: "Burlap Bag", price: 200.0, image: "/src/assets/shop/products/Burlap Bag/burlap.jpeg", liked: false, sales: 180, description: "Eco-friendly and stylish, this burlap bag is ideal for daily use." },
    { id: 4, name: "58mm Buttonpins", price: 25.0, image: "/src/assets/shop/products/buttonpin/buttonpin2.jpeg", liked: false, sales: 80, description: "Decorate your bags and outfits with these trendy 58mm button pins." },
    { id: 5, name: "Engraved Wooden Keychain", price: 150.0, image: "/src/assets/shop/products/keychain/keychain.jpeg", liked: false, sales: 150, description: "Perfect for keeping loved ones close, whether it’s for your car keys, motor keys, or house keys." },
    { id: 6, name: "Tote Bag", price: 95.0, image: "/src/assets/shop/products/totebag/totebag.jpeg", liked: false, sales: 90, description: "A durable tote bag, perfect for carrying essentials with style." },
    { id: 7, name: "Leather Engraved Keychain w/ Hook & Ring", price: 75.0, image: "/src/assets/shop/products/leatherkey/lkeychain.jpg", liked: false, sales: 140, description: "Personalized keychains that make great gifts or souvenirs." },
    { id: 8, name: "Photo Frame", price: 350.0, image: "/src/assets/shop/products/frame/frame1.jpg", liked: false, sales: 75, description: "A stylish photo frame to showcase your favorite memories." },
    { id: 9, name: "Personalized Notebook", price: 150.0, image: "/src/assets/shop/products/notebook/nb1.jpeg", liked: false, sales: 200, description: "A beautifully designed notebook for your notes and sketches." },
    { id: 10, name: "Wooden Pen & Case", price: 300.0, image: "/src/assets/shop/products/woodenpencase/pen.jpg", liked: false, sales: 50, description: "A sleek personalized pen, great for writing with style." },
    { id: 11, name: "Gift Box Set", price: 500.0, image: "/src/assets/shop/products/gift/gift3.jpeg", liked: false, sales: 300, description: "A curated gift box set, perfect for special occasions." },
    { id: 12, name: "Canvas Pouch", price: 95.0, image: "/src/assets/shop/products/pouch/canvaspouch.jpg", liked: false, sales: 130, description: "A compact and stylish canvas pouch for everyday use." },
    { id: 13, name: "Custom Dri-Fit Shirts", price: 90.0, image: "/src/assets/shop/products/drifit/drifit.jpg", liked: false, sales: 300, description: "Looking for custom corporate uniforms? Whether it’s for company events, team uniforms, or daily workwear, we offer premium Dri-Fit, cotton, and polo shirts customized with your logo, design, or branding." },
    { id: 14, name: "Cup with Lid and Straw", price: 120.0, image: "/src/assets/shop/products/cupwstraw/custommug.jpg", liked: false, sales: 130, description: "These cups with lids and straws are perfect for ANY occasion! Whether it's a gift for a loved one, a treat for yourself, or for your kids." }
]);

  //selectedProduct state to manage the product view modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Function to handle adding to cart
  const addToCart = (product: Product) => {
    if (!selectedColor || !selectedStyle) {
      setNotification("Please select a color and style before adding to cart.");
      return;
    }

    const cartItem = {
      ...product,
      selectedColor,
      selectedStyle,
      quantity: 1,
    };

    // Retrieve existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    setNotification(`${product.name} in ${selectedColor} and ${selectedStyle} has been added to cart!`);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Function to handle product click
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Function to close modal
  const closeProductView = () => {
    setSelectedProduct(null);
  };

  

  // State for search, sorting, liked filter, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Toggle like button
  const toggleLike = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, liked: !product.liked } : product
      )
    );
  };

  // Filtering & Sorting Products
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (showLikedOnly) {
      result = result.filter((product) => product.liked);
    }

    switch (sortOption) {
      case "price-low-high":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "best-selling":
        result = [...result].sort((a, b) => b.sales - a.sales);
        break;
    }

    return result;
  }, [products, searchTerm, sortOption, showLikedOnly]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct, 
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="relative" style={{ fontFamily: '"TT Firs Text Trial Light", sans-serif' }}>
      <Header />
      <div className="bg-[#f393ae] min-h-screen">
        <section className="relative flex flex-col justify-center items-center">
          <div className="absolute mt-30 w-full relative">
            <div className="w-full relative">
              <img 
                src="/src/assets/shop/banner.png" 
                alt="Shop Banner" 
                className="w-full"
              />
              <img 
                src="/src/assets/shop/shop.png" 
                alt="Shop Overlay" 
                className="absolute w-1/8 top-[35%] left-1/2 -translate-x-1/2 z-1"
              />
            </div>
            <img 
              src="/src/assets/shop/BG.png" 
              alt="clouds" 
              className="absolute top-0 left-0 w-full opacity-100"
              style={{
                maskImage: "linear-gradient(to top, white 35%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to top, white 30%, transparent 85%)"
              }}
            />
          </div>
        </section>

        {/* Product Section */}
        <div className="container mx-auto px-4 py-50">
          {/* Title and Search/Sort Controls */}
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold border-b-2 border-white pb-2">
            Love, Rivi Products {filteredAndSortedProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-
            {Math.min(indexOfLastProduct, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length}
          </h2>
            
            <div className="flex items-center space-x-4">
              {/* Search Input */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search" 
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="px-3 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Sort Dropdown */}
              <select 
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setShowLikedOnly(e.target.value === "my-likes");
                  setCurrentPage(1); // Reset to first page when sorting
                }}
                className="px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="default">Default Sorting</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="my-likes">My Likes</option>
              </select>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-20">
            {currentProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-6 h-115 relative
                cursor-pointer transition-transform transform hover:scale-105">       
                <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-md"             
                 onClick={() => handleProductClick(product)}/>
                <h3 className="text-lg font-semibold mt-8 text-starts">{product.name}</h3>
                <p className="text-gray-600 text-left">₱ {product.price.toFixed(2)}</p>
                
                {/* Like Button */}
                <button onClick={() => toggleLike(product.id)} className="absolute bottom-11 right-7 z-1">
                  <img 
                    src={product.liked ? "/src/assets/shop/like.png" : "/src/assets/shop/unlike.png"} 
                    alt="Like Button" 
                    className="w-10 h-10"
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className="px-4 py-2 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-3xl ${
                  currentPage === number 
                    ? 'bg-white text-pink-500' 
                    : 'bg text-white'
                }`}
              >
                {number}
              </button>
            ))}
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>

          {/* Log in to see more Button */}
          {!isLoggedIn && (
            <div className="flex justify-center mt-8">
              <Link to="/login" className="bg-white text-pink-500 px-6 py-3 rounded-md font-semibold hover:bg-pink-50 transition">
                Log In To See More
              </Link>
            </div>
          )}

         {/* Product Detail Modal */}
         {selectedProduct && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl border-2 border-pink-400 shadow-lg w-10/12 md:w-3/4 lg:w-2/3 xl:w-2/5 relative flex flex-col md:flex-row">
              {/* Product Image */}
              <div className="w-1/1 h-40 md:w-1/2">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-80 object-cover rounded-md" />
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2 p-4">
                <button className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-gray-900" onClick={closeProductView}>
                  ×
                </button>

                <h3 className="text-2xl font-semibold">{selectedProduct.name}</h3>
                <p className="text-gray-700 text-lg mt-1">₱ {selectedProduct.price.toFixed(2)}</p>

                {/* Colors */}
                <p className="mt-3 text-gray-600 font-semibold">Colors:</p>
                <div className="flex gap-2 mt-1">
                  {["Blue", "Pink", "Violet", "Yellow", "Orange"].map((color) => (
                    <span
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 rounded-md text-sm cursor-pointer transition-all ${
                        selectedColor === color ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {color}
                    </span>
                  ))}
                </div>

                {/* Styles */}
                <p className="mt-3 text-gray-600 font-semibold">Style:</p>
                <div className="flex gap-2 mt-1">
                  {["Plain", "Personalized"].map((style) => (
                    <span
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-3 py-1 rounded-md text-sm cursor-pointer transition-all ${
                        selectedStyle === style ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {style}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-3">
                  {selectedProduct.description}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <button 
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-all"
                    onClick={() => {
                      alert(`${selectedProduct.name} in ${selectedColor || "Default Color"} and ${selectedStyle || "Default Style"} has been added to cart!`);
                    }}
                  >
                    Add to Cart 🛒
                  </button>
                  <button 
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-all"
                    onClick={closeProductView}
                  >
                    Close
                  </button>
                </div>
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

export default Shop;