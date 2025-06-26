import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Navbar1.css";

function Navbar1() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Học từ vựng", path: "/learning" },
    { label: "Kiểm tra", path: "/test" },
    { label: "Giới thiệu", path: "/about" },
    { label: "Liên hệ", path: "/contact" },
  ];

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email);
      } else {
        setUserName("");
      }
    });
    return () => unsubscribe();
  }, []);

  // Update active index based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = navItems.findIndex(item => item.path === currentPath);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  const handleClick = (idx, path) => {
    setActiveIndex(idx);
    navigate(path);
    window.scrollTo(0, 0);
    setIsMenuOpen(false); // Close menu on mobile
  };

  const handleProfileClick = () => {
    navigate("/profile");
    window.scrollTo(0, 0);
    setIsMenuOpen(false); // Close menu on mobile
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    navigate("/learning");
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar1">
      <div className="navbar1-container">
        <div className="navbar1-logo" onClick={handleLogoClick}>
          <h1>LearnX</h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar1-nav desktop-nav">
          {navItems.map((item, idx) => (
            <li key={item.label}>
              <a
                href={item.path}
                className={`navbar1-nav-link${
                  activeIndex === idx ? " active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(idx, item.path);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Profile Button */}
        <button className="navbar1-profile-btn desktop-profile" onClick={handleProfileClick}>
          {userName ? (userName.length > 15 ? userName.substring(0, 15) + "..." : userName) : "Hồ sơ cá nhân"}
        </button>

        {/* Mobile Hamburger Button */}
        <button 
          className={`navbar1-hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <div className={`navbar1-mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar1-mobile-nav">
            {navItems.map((item, idx) => (
              <li key={item.label}>
                <a
                  href={item.path}
                  className={`navbar1-nav-link${
                    activeIndex === idx ? " active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(idx, item.path);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="navbar1-mobile-profile">
            <button className="navbar1-profile-btn mobile-profile" onClick={handleProfileClick}>
              {userName ? userName : "Hồ sơ cá nhân"}
            </button>
          </div>
        </div>

        {/* Mobile Backdrop */}
        {isMenuOpen && (
          <div 
            className="navbar1-backdrop" 
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </div>
    </nav>
  );
}

export default Navbar1;