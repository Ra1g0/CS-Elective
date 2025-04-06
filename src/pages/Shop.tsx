import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useState, useMemo, useEffect } from "react";

function Shop() {
  // Check if the user is logged in using localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
    
  // Define Product interface
  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    liked: boolean;
    sales: number;
    description: string;
  }

  // Initialize empty products array
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    
    // Load products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
    
    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  //selectedProduct state to manage the product view modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const navigate = useNavigate();
  
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

  const [isAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });

  // State for managing the product to be deleted
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Function to confirm deletion
  const confirmDeleteProduct = (productId: number) => {
    if (!isAdmin || !productToDelete) return; // Ensure only admins can delete
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProductToDelete(null); // Close the confirmation modal
  };

  return (
    <div className="relative" style={{ fontFamily: '"TT Firs Text Trial Light", sans-serif' }}>
      <div>
        {notification && (
          <div className="fixed bottom-15 left-1/2 transform -translate-x-1/2 bg-pink-300 justify-center border border-pink-700 rounded-lg shadow-md p-4 z-50">
            {notification}
          </div>
        )}
      </div>
      <Header />
      <div className="bg-[#f393ae] min-h-screen">
        <section className="relative flex flex-wrap flex-col justify-center items-center">
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
          <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-lg font-semibold border-b-2 border-white pb-2">
            Love, Rivi Products {filteredAndSortedProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-
            {Math.min(indexOfLastProduct, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length}
          </h2>
          
            <div className="flex flex-wrap items-center justify-center space-x-4 mt-2 gap-2">
              {/* Admin-only Add Product Button */}
              {isAdmin && (
                <Link
                  to="/admin/AdminAdd" // Link to the AdminAdd page
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg sm:text-lg md:text-sm lg:text-lg"
                >
                  Add Product
                </Link>
              )}
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
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
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

                  {/* Admin-only Delete Button */}
                  {isAdmin && (
                    <button
                      onClick={() => setProductToDelete(product)}
                      className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-lg text-white">No products available. {isAdmin && "Please add products using the Admin panel."}</p>
              </div>
            )}
          </div>

          {/* Pagination - Only show if there are products */}
          {currentProducts.length > 0 && (
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
          )}

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
                <div className="flex flex-wrap gap-2 mt-1">
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
                    // Function to handle adding to cart
                    if (!isLoggedIn) {
                      let countdown = 3;
                  
                      const countdownInterval = setInterval(() => {
                        setNotification(`Not logged in. Redirecting to login in ${countdown}...`);
                        countdown--;
                  
                        if (countdown < 0) {
                          clearInterval(countdownInterval);
                          navigate("/login");
                        }
                      }, 1000);
                  
                      return;
                    }

                    if (!selectedColor || !selectedStyle) {
                      setNotification("Please select a color and style before adding to cart.");
                      setTimeout(() => {
                        setNotification("");
                      }, 4000);
                      return;
                    }

                    const cartItem = {
                      ...selectedProduct,
                      selectedColor,
                      selectedStyle,
                      quantity: 1,
                    };

                    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
                    existingCart.push(cartItem);
                    localStorage.setItem("cart", JSON.stringify(existingCart));

                    setNotification(`${selectedProduct.name} in ${selectedColor} and ${selectedStyle} has been added to cart!`);
                    setTimeout(() => {
                      setNotification(null);
                    }, 3000);
                    closeProductView();
                  }}
                  >
                    {isLoggedIn ? "Add to Cart 🛒" : "Log in to add to cart 🔒"}
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
      {/* Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 bg-opacity-50 bg-gray-900 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border-2 border-pink-300">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{productToDelete.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setProductToDelete(null)} // Close modal without deleting
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                No
              </button>
              <button
                onClick={() => confirmDeleteProduct(productToDelete.id)} // Confirm deletion
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>  
      )}
      <Footer />
    </div>
  );
}

export default Shop;