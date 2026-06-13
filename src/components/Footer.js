import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10 hover:cursor-pointer">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Trivio</h2>
          <p className="text-gray-400">
            Your one-stop destination for quality products at affordable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link
                to="/"
                className="hover:text-pink-950 hover:underline transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className="hover:text-pink-950 hover:underline transition"
              >
                {" "}
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-pink-950 hover:underline transition"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-pink-950 hover:underline transition"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Shipping Policy</li>
            <li>Returns & Refunds</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact</h3>
          <p className="text-gray-400">📧 Trivio@Trivio.com</p>
          <p className="text-gray-400">📞 +91 98765 43210</p>
          <p className="text-gray-400">📍 Chennai, Tamil Nadu</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © 2026 Trivio. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
