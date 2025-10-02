import React, { useState, useEffect } from "react";
import { FiTrash2, FiEye, FiEdit } from "react-icons/fi";

interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  image?: string; // base64 string from MongoDB
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const targetProduct = editingProductId ? editingProduct : newProduct;
    const setTarget = editingProductId ? setEditingProduct : setNewProduct;
    setTarget({ ...targetProduct, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Add new product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price.toString());
      formData.append("description", newProduct.description);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("http://localhost:7000/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setNewProduct({ name: "", price: 0, description: "", image: "" });
        setImageFile(null);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Delete product
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:7000/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Start editing
  const handleEdit = (product: Product) => {
    setEditingProductId(product._id || null);
    setEditingProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image || "",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Products Dashboard</h1>

      {/* Product Table */}
      <div className="bg-white shadow rounded-lg p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Products List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100 transition">
                <td className="border px-4 py-2">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="border px-4 py-2 font-semibold">{product.name}</td>
                <td className="border px-4 py-2 text-green-600 font-bold">
                  ${product.price}
                </td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex items-center gap-1"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => product._id && handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded flex items-center gap-1"
                  >
                    <FiTrash2 /> Delete
                  </button>
                  <button
                    onClick={() => window.alert(`Viewing ${product.name}`)}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded flex items-center gap-1"
                  >
                    <FiEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingProductId ? "Edit Product" : "Add New Product"}
        </h2>
        <form
          onSubmit={editingProductId ? handleSubmit : handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={editingProductId ? editingProduct.name : newProduct.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={editingProductId ? editingProduct.price : newProduct.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={
                editingProductId
                  ? editingProduct.description
                  : newProduct.description
              }
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded font-semibold"
            >
              {editingProductId ? "Update Product" : "Add Product"}
            </button>
            {editingProductId && (
              <button
                type="button"
                onClick={() => setEditingProductId(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Products;
