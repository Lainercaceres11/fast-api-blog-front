import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import App from "../App";
import HomeUser from "../components/home-user";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import CretePostPage from "../pages/create-post";
import Navbar from "../components/navbar";
import { useUser } from "../context/user-context";
import EditPost from "../components/blogs/edit-post";

export default function Router() {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
}

function RouterContent() {
  const { user, loading, logout } = useUser();
  const { pathname } = useLocation();
  const hideNavbar = pathname === "/login" || pathname === "/register";
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {!hideNavbar && (
        <Navbar loading={loading} user={user} logout={handleLogout} />
      )}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomeUser />} />

        <Route path="/create-post" element={<CretePostPage />} />
        <Route path="/edit-post/:user_id/:blog_id" element={<EditPost />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}
