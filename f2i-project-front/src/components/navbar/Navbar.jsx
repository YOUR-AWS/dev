import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import search from "../../assets/search.png";
import user from "../../assets/noavatar.jpg";

import "./navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const CurrentUser = {
    id: 1,
    username: "Essaid Madi",
    IsAdmin: true,
  };
  return (
    <div className={active || pathname !== "/" ? "navBar active" : "navBar"}>
      <div className="nav">
        <NavLink to="/">
          <div className="left">
            <span>TioTop</span>
            <span className="dot">.</span>
          </div>
        </NavLink>
        {active && (
          <div className="middel">
            <input type="text" placeholder="What The do you look for today?" />
            <button>
              <img src={search} alt="" />
            </button>
          </div>
        )}
        <div className="right">
          <span>Accueil</span>
          <span>Categorie</span>
          <span>Contact</span>
          {CurrentUser && <span>Sign in</span>}
          {CurrentUser && <button>Join</button>}
          {!CurrentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={user} alt="" />
              <span>{CurrentUser.username}</span>
              {open && (
                <div className="option">
                  {CurrentUser.IsAdmin && (
                    <Link className="link" to="/mygigs">
                      Jeux de Concours
                    </Link>
                  )}
                  <Link className="link" to="/add">
                    Comptes
                  </Link>
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" to="/">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {active && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/">
              the Chinois
            </Link>
            <Link className="link" to="/">
              the Chinois
            </Link>
            <Link className="link" to="/">
              the Chinois
            </Link>
            <Link className="link" to="/">
              the Chinois
            </Link>
            <Link className="link" to="/">
              the Chinois
            </Link>
            <Link className="link" to="/">
              the Chinois
            </Link>
            <Link className="link" to="/">
              the Chinois
            </Link>
            <Link className="link" to="/">
              the Chinois
            </Link>
            <Link className="link" to="/">
              the Chinois
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
