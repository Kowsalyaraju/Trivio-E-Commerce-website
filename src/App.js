import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Register";
import Login from "./pages/Login";
import History from "./pages/History";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route
            path="/productdetails/:id"
            element={<ProductDetails />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/history" element={<History />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
