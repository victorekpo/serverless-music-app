import { Links } from "@/components/Navbar/Links";
import './navbar.css';

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-logo">Music App</div>
      <div><Links /></div>
    </div>
  );
};