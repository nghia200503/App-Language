import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Đăng nhập bằng Email/Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      // Kiểm tra và lưu vào Firestore nếu chưa có
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName || "",
          role: "user",
        });
      }
      // Lấy role và chuyển hướng
      const role = userSnap.exists() ? userSnap.data().role : "user";
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/learning");
      }
    } catch (err) {
      setError("Sai email hoặc mật khẩu!");
    }
  };

  // Đăng nhập bằng Google
  const handleGoogleLogin = async () => {
  setError("");
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    // Kiểm tra và lưu vào Firestore nếu chưa có
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || "",
        role: "user"
      });
    }
    // Lấy role và chuyển hướng
    const role = userSnap.exists() ? userSnap.data().role : "user";
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/learning");
    }
  } catch (err) {
    setError("Đăng nhập Google thất bại!");
  }
};

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Main Content */}
        <div className="main-content">
          <div className="hero-section">
            <div className="hero-text">
              <h1>Chào mừng trở lại với LearnX</h1>
              <p>
                Tiếp tục hành trình học tiếng Anh thông minh và hiệu quả của bạn
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="login-form-container">
            <div className="login-form">
              <h2>Đăng nhập</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Nhập mật khẩu"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <div className="checkbox-container">
                    <input type="checkbox" />
                    <span className="checkmark">Ghi nhớ đăng nhập</span>
                  </div>
                  <a href="#forgot" className="forgot-password">
                    Quên mật khẩu?
                  </a>
                </div>

                <button type="submit" className="login-btn">
                  Đăng nhập
                </button>
              </form>

              <div className="divider">
                <span>hoặc</span>
              </div>

              <div className="social-login">
                <button
                  className="social-btn google"
                  onClick={handleGoogleLogin}
                  type="button"
                >
                  <span><FcGoogle className="google-icon"/></span>
                  Đăng nhập với Google
                </button>
              </div>

              {error && (
                <div style={{ color: "red", marginTop: 14 }}>{error}</div>
              )}

              <div className="signup-link">
                <p>
                  Chưa có tài khoản? <a href="#signup">Đăng ký ngay</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
