import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/cart").then((res) => {
      setCartItems(res.data);
    });
  }, []);

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5000/cart/${id}`);

    setCartItems(
      cartItems.filter(function (item) {
        if (item._id == id) {
          return false;
        } else {
          return true;
        }
      }),
    );
  };
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row items-center gap-6"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-40 h-40 object-contain"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{item.name}</h2>

                    <p className="text-gray-600 mt-2">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-2xl font-bold text-green-600 mt-2">
                      ₹{item.price}
                    </p>
                  </div>

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-5">
                <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

                <div className="flex justify-between mb-3">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>

                <div className="flex justify-between text-xl font-bold border-t pt-4">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg mt-6 text-lg font-semibold"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
