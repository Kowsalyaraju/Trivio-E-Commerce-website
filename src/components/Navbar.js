import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../config/firebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const [menu, setmenu] = useState(false);
  const [log, setlog] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setlog(true);
        console.log("user Logged In");
      } else {
        setlog(false);
        console.log("User Logged Out");
      }
    });
  }, []);

  function logout() {
    signOut(auth);
  }
  return (
    <>
      <div className="flex flex-row justify-between items-center border border-b-2 p-4 px-4 py-4 bg-white sticky top-0 z-50">
        <div>
          <h1 className="text-3xl md:text-4xl text-pink-950 font-bold">
            Trivio
          </h1>
        </div>

        <div className="hidden md:flex justify-center gap-8 ">
          <Link
            to="/"
            className="hover:text-pink-950 hover:underline transition text-xl"
          >
            Home
          </Link>

          <Link
            to="/product"
            className="hover:text-pink-950 hover:underline transition text-xl"
          >
            Products
          </Link>

          <Link to="/cart" className="text-xl">
            <i
              className="fa-solid fa-shopping-cart"
              style={{ color: "rgb(10, 11, 11)" }}
            ></i>
          </Link>

          {log ? (
            <Link className=" text-xl" onClick={logout}>
              Logout
            </Link>
          ) : (
            <Link to="/login" className=" text-xl">
              Login
            </Link>
          )}

          <Link to="/history" className="text-xl">
            Orders
          </Link>
        </div>

        {/* Mobile View */}
        <div
          className="block md:hidden cursor-pointer"
          onClick={() => setmenu(!menu)}
        >
          <i className="fa-solid fa-bars text-black"></i>
        </div>
      </div>

      {/* Mobile Menu - Below Navbar, Left Side */}

      {menu && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-start p-4 gap-4">
            <Link to="/" onClick={() => setmenu(false)}>
              Home
            </Link>

            <Link to="/product" onClick={() => setmenu(false)}>
              Products
            </Link>

            <Link to="/cart" onClick={() => setmenu(false)}>
              Cart
            </Link>

            {log ? (
              <Link onClick={logout}>
              Logout
            </Link>) :
            (
              <Link to="/login" onClick={() => setmenu(false)}>
              Login
            </Link>
            )}

            <Link to="/history" onClick={() => setmenu(false)}>
              My Orders
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
