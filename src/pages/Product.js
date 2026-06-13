import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://trivio-e-commerce-website-backend-3.onrender.com/products")
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Shop The Latest Trends</h1>

          <p className="text-lg">
            Discover amazing products at unbeatable prices
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border w-full max-w-lg p-3 rounded-xl shadow"
        />
      </div>

      <div className="container mx-auto p-5 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-5">Products</h1>

        <div className="grid grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <div key={product._id} className="border p-3 rounded shadow">
              <img
                src={product.image}
                alt={product.name}
                className="h-96 w-full object-contain"
              />

              <h2 className="font-bold mt-2">{product.name}</h2>

              <p>₹{product.price}</p>

              <button
                className="bg-blue-500 text-white px-4 py-2 mt-3"
                onClick={() => navigate(`/productdetails/${product._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Product;
