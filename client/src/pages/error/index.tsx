import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ErrorPage = () => {
  return (
    <>
      <div className="main-container">
        <div className="main-navbar">
          <Navbar/>
        </div>
        <div className="page-container">
          Error!
        </div>
      </div>
      <div className="footer-container">
        <Footer/>
      </div>
    </>
  );
};

export default ErrorPage;