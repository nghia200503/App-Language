import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleRegister = () => {
    navigate("/register");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavLinkClick = (e, hash) => {
    e.preventDefault();
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>LearnX</Link>
        <ul className="nav-links">
          <li><a href="#intro">Giới thiệu</a></li>
          <li><a href="#benefits">Lợi ích</a></li>
          <li><a href="#features">Tính năng</a></li>
          <li><a href="#stats">Thống kê</a></li>
        </ul>
        <div className="nav-actions">
          <button onClick={handleRegister} className="btn btn-outline">Đăng ký</button>
          <button onClick={handleLogin} className="btn btn-primary">Đăng nhập</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;