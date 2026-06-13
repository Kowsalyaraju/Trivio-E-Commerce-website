import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  const addToCart = async () => {
    await axios.post("http://localhost:5000/cart", {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    navigate("/cart");
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-5">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Shop The Latest Trends</h1>

          <p className="text-lg">
            Discover amazing products at unbeatable prices
          </p>
        </div>
      </div>

      <div className="container mx-auto p-5 flex justify-center border border-black rounded-lg bg-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-80 object-contain"
          />

          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <p className="mt-3">{product.description}</p>

            <p className="text-2xl font-semibold mt-3">₹{product.price}</p>

            <button
              className="bg-green-500 text-white px-5 py-2 mt-4 rounded"
              onClick={addToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
