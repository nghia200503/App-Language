import { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else navigate("/login");
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Hiệu ứng loading 1s
    await signOut(auth);
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-avatar" src={user.photoURL} alt="avatar" />
      </div>

      <div className="profile-content">
        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">Họ tên:</span>
            <span className="info-value">
              {user.displayName || "Chưa đặt tên"}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Trạng thái:</span>
            <span className="info-value">
              <span
                className={
                  user.emailVerified
                    ? "profile-badge badge-verified"
                    : "profile-badge badge-unverified"
                }
              >
                {user.emailVerified ? "Đã xác thực" : "Chưa xác thực"}
              </span>
            </span>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="profile-btn profile-logout-btn"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              "Đăng xuất"
            )}
          </button>
          {loading && <div className="logout-loading-text"></div>}
        </div>
      </div>
    </div>
  );
}