import { Link, useLocation } from 'react-router-dom';
import './navbarlink.css';

const NavLink = ({ item, setOpen }: any) => {
  const location = useLocation();

  return (
    <Link
      to={item.path}
      className={`container ${location.pathname === item.path ? 'active' : ''}`}
      onClick={() => setOpen(false)}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
