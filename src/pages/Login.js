import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";
import { useEffect } from "react";

function Login() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [error, seterror] = useState("");

  const navigate = useNavigate();

 //Handle Email

  function handlemail(event) {
    setemail(event.target.value);
  }


  //Handle Password

  function handlepass(event) {
    setpass(event.target.value);
  }

  
  // All Fields are Required


  function check() {
    if (email === "" || pass === "") {
      seterror("All fields are required");
      return;
    }

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        alert("Login Successful");
        navigate("/");
      })
      .catch((error) => {
        seterror("Invalid email or password");
        console.log(error);
      });
  }

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-center items-center mt-20">
        <h1 className=" text-3xl md:text-5xl text-gray-800 font-bold mb-5">
          Enter your info to sign in
        </h1>

        <p className="text-md md:text-xl text-gray-800 mb-10">
          Or get started with a new account.
        </p>

        {error && (
          <div className="bg-red-600 text-white px-5 py-3 rounded mb-5 text-center">
            <p>{error}</p>
          </div>
        )}

        {/* Login Box */}
        <div className="w-[400px]">
          <input
            onChange={handlemail}
            value={email}
            type="email"
            placeholder="Email"
            className=" w-full p-4 mb-5 rounded bg-gray-700  text-white outline-none"
          />

          <input
            onChange={handlepass}
            value={pass}
            type="password"
            placeholder="Password"
            className="w-full p-4 mb-5 rounded bg-gray-700 text-white outline-none"
          />
          <br></br>

          <button
            onClick={check}
            className=" w-full p-4 rounded bg-red-600 hover:bg-red-700 text-white font-bold transition"
          >
            Sign In
          </button>
          <br />
          <br />
          <p className="text-center">
            New User?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer font-semibold hover:underline"
            >
              Register Now
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
