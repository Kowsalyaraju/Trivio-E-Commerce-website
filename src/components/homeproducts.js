import bodylotion from "../assets/images/bodylotion.jpg";
import Headphones from "../assets/images/Headphones.jpg";
import Lipstick from "../assets/images/Lipstick.jpg";
import perfume from "../assets/images/perfume.jpg";
import phone from "../assets/images/phones.webp";
import { useNavigate } from "react-router-dom";

function Front() {
  const navigate = useNavigate();
  return (
    <div className="mt-10 px-6">
      <h1 className="text-3xl font-bold  mb-8">Original Brands</h1>

      <div className="flex flex-wrap justify-center gap-6">
        <div
          className="w-60 border rounded-lg bg-blue-600 overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer hover:scale-105 transition duration-500"
          onClick={() => {
            navigate("/product");
          }}
        >
          <img
            src={bodylotion}
            alt="Body Lotion"
            className="w-full h-72 object-cover "
          />

          <h1 className="text-center text-white font-semibold py-3">
            Personal Care
          </h1>
        </div>

        <div
          className="w-60 border rounded-lg bg-blue-600 overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer hover:scale-105 transition duration-500"
          onClick={() => {
            navigate("/product");
          }}
        >
          <img
            src={Headphones}
            alt="Headphones"
            className="w-full h-72 object-cover "
          />
          <h1 className="text-center text-white font-semibold py-3">
            Electronics
          </h1>
        </div>

        <div
          className="w-60 border rounded-lg bg-blue-600 overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer hover:scale-105 transition duration-500"
          onClick={() => {
            navigate("/product");
          }}
        >
          <img
            src={Lipstick}
            alt="Lipstick"
            className="w-full h-72 object-cover "
          />

          <h1 className="text-center text-white font-semibold py-3">Makeup</h1>
        </div>

        <div
          className="w-60 border rounded-lg bg-blue-600 overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer hover:scale-105 transition duration-500"
          onClick={() => {
            navigate("/product");
          }}
        >
          <img
            src={perfume}
            alt="Perfume"
            className="w-full h-72 object-cover "
          />

          <h1 className="text-center text-white font-semibold py-3">
            Perfumes
          </h1>
        </div>

        <div
          className="w-60 rounded-lg overflow-hidden bg-blue-600 shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer hover:scale-105 transition duration-500"
          onClick={() => {
            navigate("/product");
          }}
        >
          <img
            src={phone}
            alt="Phone"
            className="w-full h-72 object-contain bg-white"
          />

          <h1 className="text-center text-white font-semibold py-3">
            Smart Phones
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Front;
