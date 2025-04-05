import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  liked: boolean;
  sales: number;
  description: string;
}

function ProductManagement() {
  // Get products from localStorage or use defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
    
    // Default products from your Shop component
    return [
      { id: 1, name: "15 oz Mug", price: 250.0, image: "/src/assets/shop/products/mugs/mug1.jpeg", liked: false, sales: 100, description: "A high-quality 15 oz ceramic mug, perfect for coffee lovers." },
      { id: 2, name: "Badge Pen", price: 100.0, image: "/src/assets/shop/products/Badge Pens/badge3.jpeg", liked: false, sales: 250, description: "These pens are perfect for birthdays, thank-you gifts, or any occasion that calls for a personal touch." },
      { id: 3, name: "Burlap Bag", price: 200.0, image: "/src/assets/shop/products/Burlap Bag/burlap.jpeg", liked: false, sales: 180, description: "Eco-friendly and stylish, this burlap bag is ideal for daily use." },
      { id: 4, name: "58mm Buttonpins", price: 25.0, image: "/src/assets/shop/products/buttonpin/buttonpin2.jpeg", liked: false, sales: 80, description: "Decorate your bags and outfits with these trendy 58mm button pins." },
      { id: 5, name: "Engraved Wooden Keychain", price: 150.0, image: "/src/assets/shop/products/keychain/keychain.jpeg", liked: false, sales: 150, description: "Perfect for keeping loved ones close, whether it's for your car keys, motor keys, or house keys." },
    ];
  });

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Default form values for a new product
  const defaultNewProduct = {
    id: 0,
    name: '',
    price: 0,
    image: '',
    liked: false,
    sales: 0,
    description: ''
  };

  const handleAddNew = () => {
    // Generate a new ID
    const newId = products.length > 0 
      ? Math.max(...products.map(p => p.id)) + 1 
      : 1;
    
    setCurrentProduct({
      ...defaultNewProduct,
      id: newId
    });
    setIsEditing(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct({ ...product });
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProduct) return;

    if (isEditing) {
      // Update existing or add new product
      const exists = products.some(p => p.id === currentProduct.id);
      
      if (exists) {
        // Update existing
        setProducts(products.map(p => 
          p.id === currentProduct.id ? currentProduct : p
        ));
      } else {
        // Add new
        setProducts([...products, currentProduct]);
      }
      
      // Reset form
      setCurrentProduct(null);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setCurrentProduct(null);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProduct) return;

    const { name, value } = e.target;
    
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' || name === 'sales' 
        ? parseFloat(value) || 0 
        : value
    });
  };

  return (
    <div>
      {isEditing ? (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {currentProduct?.id && products.some(p => p.id === currentProduct.id) 
              ? 'Edit Product' 
              : 'Add New Product'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentProduct?.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₱)
                </label>
                <input
                  type="number"
                  name="price"
                  value={currentProduct?.price || ''}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={currentProduct?.image || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sales Count
                </label>
                <input
                  type="number"
                  name="sales"
                  value={currentProduct?.sales || ''}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={currentProduct?.description || ''}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Product List</h3>
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
            >
              Add New Product
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Image</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Sales</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-t">
                    <td className="py-2 px-4">{product.id}</td>
                    <td className="py-2 px-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">₱{product.price.toFixed(2)}</td>
                    <td className="py-2 px-4">{product.sales}</td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;