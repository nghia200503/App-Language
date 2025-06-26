import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./Admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    navigate("/learning");
  }
}, [navigate, location]);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <h2>Quản lý hệ thống</h2>
      <div className="admin-btn-group">
        <button className="admin-main-btn" onClick={() => navigate("/admin/vocabulary")}>
          Quản lý từ vựng
        </button>
        <button className="admin-main-btn" onClick={() => navigate("/admin/user")}>
          Quản lý người dùng
        </button>
      </div>
      <button className="admin-logout-btn bottom" onClick={handleLogout}>
        Đăng xuất
      </button>
    </div>
  );
}