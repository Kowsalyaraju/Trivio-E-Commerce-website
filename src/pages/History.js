import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function History() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-10">
            Order History
          </h1>

          {orders.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              No Orders Found
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-lg p-6 mb-6"
              >
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-bold">
                    {order.customer.fullName}
                  </h2>

                  <span className="font-semibold text-green-600">
                    ₹{order.total}
                  </span>
                </div>

                <p>{order.customer.email}</p>
                <p>{order.customer.phone}</p>

                <p className="mt-2 text-gray-600">
                  {order.customer.address},{order.customer.city},
                  {order.customer.state} -{order.customer.pincode}
                </p>

                <div className="mt-4 border-t pt-4">
                  <h3 className="font-bold mb-2">Ordered Items</h3>

                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2">
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default History;
