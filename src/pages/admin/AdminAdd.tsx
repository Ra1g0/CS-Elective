import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string; // This will now store the base64 string of the uploaded image
  description: string;
}

function AdminAdd() {
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    image: "",
    description: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation dialog
  const navigate = useNavigate();

  // Check if the user is an admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      alert("Access denied. Admins only.");
      navigate("/login");
    }
  }, [navigate]);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct((prev) => ({
          ...prev,
          image: reader.result as string, // Store the base64 string
        }));
      };
      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  };

  // Add a new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill in all fields.");
      return;
    }

    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const updatedProducts = [
      ...storedProducts,
      { ...newProduct, id: Date.now() }, // Assign a unique ID
    ];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setNewProduct({ id: 0, name: "", price: 0, image: "", description: "" });

    // Redirect to Shop page after adding the product
    navigate("/shop");
  };

  // Show confirmation dialog
  const handleShowConfirmation = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill in all fields.");
      return;
    }
    setShowConfirmation(true);
  };

  // Handle confirmation response
  const handleConfirmationResponse = (response: boolean) => {
    setShowConfirmation(false);
    if (response) {
      handleAddProduct(); // Add the product if the user confirms
    }
  };

  return (
    <div className="relative" style={{ fontFamily: '"TT Firs Text Trial Light", sans-serif' }}>
      <Header />
      <div className="bg-[#f393ae] min-h-screen">
        <section className="relative flex flex-col justify-center items-center">
          <div className="absolute mt-30 w-full relative">
            <div className="w-full relative">
              <img
                src="/src/assets/shop/banner.png"
                alt="Admin Banner"
                className="w-full"
              />
            </div>
            <img
              src="/src/assets/shop/BG.png"
              alt="clouds"
              className="absolute top-0 left-0 w-full opacity-100"
              style={{
                maskImage: "linear-gradient(to top, white 35%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to top, white 30%, transparent 85%)",
              }}
            />
          </div>
        </section>

        {/* Add Product Form */}
        <div className="container mx-auto px-4 py-50">
          <h2 className="text-lg font-semibold border-b-2 border-white pb-2 text-center">
            Admin Shop Add Product
          </h2>
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-2">Add Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="border p-2 rounded w-full mb-2 bg-white"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price === 0 ? "" : newProduct.price || ""}
              onChange={(e) => {
                const inputValue = e.target.value;
                setNewProduct({
                  ...newProduct,
                  price: inputValue === "" ? 0 : parseFloat(inputValue) || 0,
                });
              }}
              className="border p-2 rounded w-full mb-2 bg-white"
              step="1"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border p-2 rounded w-full mb-2 bg-white"
            />
            {newProduct.image && (
              <img
                src={newProduct.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mb-2"
              />
            )}
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="border p-2 rounded w-full mb-2 bg-white"
            />
            <button
              onClick={handleShowConfirmation}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("isAdmin"); // Remove the admin flag
                alert("Logged out successfully!");
                navigate("/login"); // Redirect to the login page
              }}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h2 className="text-lg font-semibold mb-4">Confirm Add Product</h2>
            <p>Are you sure you want to add this product?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => handleConfirmationResponse(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                No
              </button>
              <button
                onClick={() => handleConfirmationResponse(true)}
                className="bg-pink-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="relative w-full">
        {/* Background Image with Responsive Sizing */}
        <img 
          src="/src/assets/services/footbanner.png" 
          alt="circle" 
          className="flex relative -mt-40 w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-[800px]"
        />
      </div>
      <Footer />
    </div>
  );
}

export default AdminAdd;