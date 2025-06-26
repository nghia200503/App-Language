import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const role = localStorage.getItem("role");
  const location = useLocation();

  // Nếu truy cập đường dẫn bắt đầu bằng /admin mà không phải admin thì chuyển hướng
  if (location.pathname.startsWith("/admin") && role !== "admin") {
    return <Navigate to="/learning" replace />;
  }

  return children;
}