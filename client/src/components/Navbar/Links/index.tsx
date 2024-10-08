import { useState } from "react";
import NavLink from "@/components/Navbar/Links/NavLink";
import { menuLinks } from './links';
import './links.css';
import { ProfileBadge } from "@/components/Badge";

export const Links = () => {
  const [open, setOpen] = useState(false);
  const links = menuLinks;

  const session = true;
  // const isAdmin = true;
  // const adminLink = false;

  return (
    <div className="links-container">
      <div className="links-items">
        {links.map(link => {
          return <NavLink
            setOpen={setOpen}
            item={link}
            key={link.title}
          />
        })}
        {session ? (
          <>
            {/*{ isAdmin && adminLink && <NavLink item={ { title: "Admin", path: "/admin" } }/> }*/}
            <ProfileBadge/>
            {/*<button className="links-logout">Logout</button>*/}
          </>
        ) : (
          <NavLink
            setOpen={setOpen}
            item={{ title: "Login", path: "/login" }}
          />
        )
        }
      </div>
      <div className="links-mobile-container">
        <button
          className="links-menu-button"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
        {(session && <ProfileBadge/>)}
      </div>
      {open && (
        <div className="links-mobile-links">
          {links.map(link =>
            <NavLink
              item={link}
              key={link.title}
              setOpen={setOpen}
            />
          )}
        </div>
      )}
    </div>
  )
};