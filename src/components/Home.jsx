import React, { useState, useEffect } from "react";
import { data, Link , useNavigate } from "react-router-dom";
import "./Nav.css";
import Profile from '../components/Profile.jpg'

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const Role = localStorage.getItem("role");

  // Track login/logout by watching localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleRegister = () => {
    navigate("/category");
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/"); 
  };

  return (
    <nav className="navbar">
        <div className="nav-logo"><Link to="/" className="nav-logo">Cab Service</Link></div>
        
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li><Link to="/services" className="nav-link" onClick={() => setMenuOpen(false)}>Services</Link></li>
          <li><Link to="/Booking" className="nav-link" onClick={() => setMenuOpen(false)}>Booking</Link></li>
          <li><Link to="/About" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/Contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
          

          
          <div className="mobile-auth-buttons">
            {!isLoggedIn ? (
              <>
                <button className="nav-button-login" onClick={handleLogin}>Login</button>
                <button className="nav-button" onClick={handleRegister}>Sign up for free</button>
              </>
            ) : (
              <>
              <button className="nav-button" onClick={handleLogout}>Logout</button>
              <a href="/profile"><img  alt=""
              src={Profile} 
              className="profilenav"
              /></a>
              </>
            )}
          </div>
        </ul>
        
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
       <div className="nav-right desktop-only">
        {!isLoggedIn ? (
          <>
            <button className="nav-button-login" onClick={handleLogin}>Login</button>
            <button className="nav-button" onClick={handleRegister}>Sign up for free</button>    
          </>
        ) : (
          <>
          <button className="nav-button" onClick={handleLogout}>Logout</button>
          <a href="/profile"><img  alt=""
          src={Profile} 
          className="profilenav"
          /></a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
