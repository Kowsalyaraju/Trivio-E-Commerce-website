import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import auth from "../config/firebase";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://trivio-e-commerce-website-backend-3.onrender.com";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // 🔐 Auth check
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        alert("Please login to continue");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 🛒 Get cart
  useEffect(() => {
    axios
      .get(`${BASE_URL}/cart`)
      .then((res) => setCartItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // 📝 Form change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 💳 Razorpay Payment
  const handleOrder = async () => {
    try {
      if (cartItems.length === 0) {
        alert("Cart is empty");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const { data } = await axios.post(`${BASE_URL}/create-order`, {
        amount: total,
      });

      const options = {
        key: "rzp_test_T1BbTnLtdITiti",
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,

        handler: async function (response) {
          await axios.post(`${BASE_URL}/orders`, {
            customer: formData,
            items: cartItems,
            total,
            paymentId: response.razorpay_payment_id,
          });

          setOrderPlaced(true);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  // 🎉 Success page
  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-600">
              Order Placed Successfully 🎉
            </h1>

            <button
              onClick={() => navigate("/")}
              className="mt-5 bg-green-600 text-white px-6 py-3 rounded"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-10">
            Secure Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 🏠 FORM */}
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border p-3 rounded"
                />

                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-3 rounded"
                />

                <input
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-3 rounded"
                />

                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border p-3 rounded"
                />

                <input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="border p-3 rounded"
                />

                <input
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="border p-3 rounded"
                />
              </div>

              <textarea
                name="address"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
                className="border p-3 rounded w-full mt-4"
                rows="4"
              />
            </div>

            {/* 🧾 ORDER SUMMARY */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between py-2">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}

              <div className="font-bold text-xl mt-4">Total: ₹{total}</div>

              <button
                onClick={handleOrder}
                className="w-full bg-green-600 text-white py-3 mt-4 rounded"
              >
                Pay Now
              </button>

              <p className="text-sm text-gray-500 mt-3">
                Delivery: 3–5 Business Days
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
