import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../config/firebase";
import { useEffect } from "react";

function Signup() {
  const [newemail, setnewemail] = useState("");
  const [newpass, setnewpass] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        navigate("/");
      }
    });
  }, [navigate]);

  
  // Handling NewMail

  function handlenewemail(event) {
    setnewemail(event.target.value);
  }

  
  //Handle Newpass
  

  function handlenewpass(event) {
    setnewpass(event.target.value);
  }

  function check() {
    if (newemail === "" || newpass === "") {
      alert("All fields are required");
      return;
    }

    createUserWithEmailAndPassword(auth, newemail, newpass)
      .then(async (userCredential) => {
        await signOut(auth);

        alert("Registered Successfully");
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  }
  return (
    <>
      <Navbar />

      {/* Login Section */}
      <div className="flex flex-col justify-center items-center mt-20 ">
        <h1 className=" text-3xl md:text-5xl text-gray-800 font-bold mb-5">
          Enter your info to Register
        </h1>

        <p className="text-md md:text-xl text-gray-800 mb-10">
          Or get started with a new account.
        </p>

        {/* Register Box */}
        <div className="w-[400px]">
          <input
            onChange={handlenewemail}
            value={newemail}
            type="email"
            placeholder="Email"
            className=" w-full p-4 mb-5 rounded bg-gray-700  text-white outline-none"
          />

          <input
            onChange={handlenewpass}
            value={newpass}
            type="password"
            placeholder="Password"
            className="w-full p-4 mb-5 rounded bg-gray-700 text-white outline-none"
          />
          <br></br>

          <button
            onClick={check}
            className=" w-full p-4 rounded bg-red-600 hover:bg-red-700 text-white font-bold transition"
          >
            SignUp
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Signup;
