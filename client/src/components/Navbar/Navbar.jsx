// Navbar.jsx

import React, { useEffect, useState } from "react";

import { NavLink, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMagnifyingGlass,
  faCartShopping,
  faUser,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/logo.png";

import "./Navbar.css";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  // CLOSE MENU
  const closeMenu = () => setIsOpen(false);

  // LOCK BODY SCROLL
  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "auto";
  }, [isOpen]);

  // UPDATE CART COUNT
  useEffect(() => {

    const updateCartCount = () => {
      const count =
        Number(localStorage.getItem("cartCount")) || 0;

      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );
    };

  }, []);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/collection", name: "Collection" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <nav className="navbar">

      <div className="container navbar__container">

        {/* LOGO */}
        <div className="navbar__logo">

          <Link to="/" onClick={closeMenu}>

            <img
              src={logo}
              alt="logo"
              className="navbar__logo-img"
            />

          </Link>

        </div>

        {/* MENU */}
        <ul
          className={`navbar__menu ${
            isOpen ? "active" : ""
          }`}
        >

          {navLinks.map((link) => (
            <li
              key={link.path}
              className="navbar__item"
            >

              <NavLink
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "navbar__link active"
                    : "navbar__link"
                }
              >
                {link.name}
              </NavLink>

            </li>
          ))}

        </ul>

        {/* RIGHT SIDE */}
        <div className="navbar__right">

          {/* ICONS */}
          <div className="navbar__actions">

            {/* SEARCH */}
            <NavLink
              to="/search"
              className="navbar__icon"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
              />
            </NavLink>

            {/* CART */}
            <NavLink
              to="/cart"
              className="navbar__icon"
            >

              <FontAwesomeIcon
                icon={faCartShopping}
              />

              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount}
                </span>
              )}

            </NavLink>

            {/* USER */}
            <NavLink
              to="/login"
              className="navbar__icon"
            >
              <FontAwesomeIcon icon={faUser} />
            </NavLink>

          </div>

          {/* TOGGLE */}
          <button
            className="navbar__toggle"
            onClick={() => setIsOpen(!isOpen)}
          >

            <FontAwesomeIcon
              icon={isOpen ? faX : faBars}
            />

          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;