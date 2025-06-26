import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Navbar1 from "./components/Navbar1/Navbar1";
import Learning from "./pages/Learning/Learning";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./pages/Register/Register";
import TopicDetail from "./pages/TopicDetail/TopicDetail";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Profile/Profile";
import Test from "./pages/Test/Test";
import VocabularyManager from "./pages/VocabularyManager/VocabularyManager";
import UserManager from "./pages/UserManager/UserManager";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");
  const isLearningPage =
    location.pathname === "/learning" ||
    location.pathname.startsWith("/topic/") ||
    location.pathname === "/profile" ||
    location.pathname === "/test";

  return (
    <>
      {!isAdminPage && (isLearningPage ? <Navbar1 /> : <Navbar />)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/topic/:slug" element={<TopicDetail />} />
        <Route path="/test" element={<Test />} />
        <Route path="/profile" element={<Profile />} />

        {/* Các route admin được bảo vệ */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vocabulary"
          element={
            <ProtectedRoute>
              <VocabularyManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user"
          element={
            <ProtectedRoute>
              <UserManager />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;