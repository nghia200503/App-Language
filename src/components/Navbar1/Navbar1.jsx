import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Navbar1.css";

function Navbar1() {
  const [activeIndex, setActiveIndex] = useState(1); // Mặc định "Học từ vựng" active
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { label: "Trang chủ", path: "/" },
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

  const handleClick = (idx, path) => {
    setActiveIndex(idx);
    navigate(path);
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  };

  const handleProfileClick = () => {
    navigate("/profile");
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  };

  return (
    <nav className="navbar1">
      <div className="navbar1-container">
        <div className="navbar1-logo">
          <h1>LearnX</h1>
        </div>
        <ul className="navbar1-nav">
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
        <button className="navbar1-profile-btn" onClick={handleProfileClick}>
          {userName ? userName : "Hồ sơ cá nhân"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar1;
