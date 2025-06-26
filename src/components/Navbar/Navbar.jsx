import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = (e, hash) => {
  e.preventDefault();
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    // Nếu không tìm thấy, fallback về hash như cũ
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  setIsMenuOpen(false);
};

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="nav-container">
        <Link 
          to="/" 
          className="logo" 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsMenuOpen(false);
          }}
        >
          LearnX
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav">
          <li><a href="#intro" onClick={(e) => handleNavLinkClick(e, "#intro")}>Giới thiệu</a></li>
          <li><a href="#benefits" onClick={(e) => handleNavLinkClick(e, "#benefits")}>Lợi ích</a></li>
          <li><a href="#features" onClick={(e) => handleNavLinkClick(e, "#features")}>Tính năng</a></li>
          <li><a href="#stats" onClick={(e) => handleNavLinkClick(e, "#stats")}>Thống kê</a></li>
        </ul>

        {/* Desktop Actions */}
        <div className="nav-actions desktop-actions">
          <button onClick={handleRegister} className="btn btn-outline">Đăng ký</button>
          <button onClick={handleLogin} className="btn btn-primary">Đăng nhập</button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-links">
            <li><a href="#intro" onClick={(e) => handleNavLinkClick(e, "#intro")}>Giới thiệu</a></li>
            <li><a href="#benefits" onClick={(e) => handleNavLinkClick(e, "#benefits")}>Lợi ích</a></li>
            <li><a href="#features" onClick={(e) => handleNavLinkClick(e, "#features")}>Tính năng</a></li>
            <li><a href="#stats" onClick={(e) => handleNavLinkClick(e, "#stats")}>Thống kê</a></li>
          </ul>
          <div className="mobile-actions">
            <button onClick={handleRegister} className="btn btn-outline">Đăng ký</button>
            <button onClick={handleLogin} className="btn btn-primary">Đăng nhập</button>
          </div>
        </div>

        {/* Backdrop */}
        {isMenuOpen && <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)}></div>}
      </div>
    </nav>
  );
}

export default Navbar;