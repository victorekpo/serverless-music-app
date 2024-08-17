import { Links } from "@/components/Navbar/Links";
import './navbar.css';
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="navbar-container" onClick={() => {
      navigate("/")
    }}>
      <div className="navbar-logo">
        Music App
      </div>
      <div><Links/></div>
    </div>
  );
};