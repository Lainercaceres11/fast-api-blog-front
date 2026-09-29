import { BrowserRouter, Route, Routes } from "react-router";
import App from "../App";
import HomeUser from "../components/home-user";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomeUser />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
