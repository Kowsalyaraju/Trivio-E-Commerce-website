import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import auth from "../config/firebase";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        alert("Please login to continue");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cart")
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = async () => {
    console.log("Button Clicked");

    try {
      console.log("Creating Razorpay Order");

      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount: total,
      });

      const options = {
        key: "rzp_test_T1BbTnLtdITiti",
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,

        handler: async function (response) {
          console.log("Payment Success", response);

          await axios.post("http://localhost:5000/orders", {
            customer: formData,
            items: cartItems,
            total,
            paymentId: response.razorpay_payment_id,
          });

          setOrderPlaced(true);
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.log("PAYMENT FAILED");
        console.log(response.error);
      });

      rzp.open(); // IMPORTANT
    } catch (err) {
      console.log("ERROR:", err);
    }
  };
  if (orderPlaced) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg w-full">
            <div className="text-7xl mb-4">🎉</div>

            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Order Placed Successfully!
            </h1>

            <p className="text-gray-600 text-lg mb-6">
              Thank you for shopping with us. Your order has been confirmed and
              will be delivered soon.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700">
                Estimated Delivery: 3 - 5 Business Days
              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
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
            {/* Shipping Information */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleChange}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State *"
                  value={formData.state}
                  onChange={handleChange}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode *"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <textarea
                name="address"
                rows="5"
                placeholder="Complete Address *"
                value={formData.address}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-5">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                {cartItems.length === 0 ? (
                  <p className="text-gray-500">No items in cart</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between border-b py-3"
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>

                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="font-bold">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}

                    <div className="flex justify-between text-xl font-bold mt-6">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>

                    <button
                      onClick={handleOrder}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-6 text-lg font-semibold transition"
                    >
                      Pay Now
                    </button>

                    <div className="mt-4 text-center text-sm text-gray-600">
                      Estimated Delivery: 3 - 5 Business Days
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
