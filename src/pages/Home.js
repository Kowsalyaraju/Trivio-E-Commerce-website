import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import saleImage from "../assets/images/Saleimage.png";
import offerImage from "../assets/images/offerimage.jpg";
import Front from "../components/homeproducts";
import Gold from "../assets/images/gold.webp";

function Home() {
  return (
    <>
      <Navbar />

      <div>
        <div className="">
          <img src={saleImage} alt="Sale Banner" className="h-80 w-full" />
        </div>
      </div>

      <Front />

      <div className="mt-12 flex flex-row items-center">
        <img src={offerImage} alt="Offer Banner" className="w-1/2" />
        <div className="font-bold text-xs md:text-2xl ml-9">
          <h4>Satisfaction Guarantee</h4>
          <p className="mt-10">
            At Trivio, your satisfaction is our top priority. We are committed
            to providing a seamless shopping experience with high-quality
            products and reliable service.
          </p>
        </div>
      </div>

      <div>
        <img src={Gold} alt="Gold Imgae" className="mt-14" />
      </div>

      <Footer />
    </>
  );
}

export default Home;
