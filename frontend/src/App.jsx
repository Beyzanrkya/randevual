import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BusinessRegister from "./pages/BusinessRegister";
import BusinessLogin from "./pages/BusinessLogin";
import BusinessAppointments from "./pages/BusinessAppointments";
import Comments from "./pages/Comments";
import Categories from "./pages/Categories";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "10px", background: "#333", display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Ana Sayfa</Link>
        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Kayıt</Link>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Giriş</Link>
        <Link to="/appointments" style={{ color: "white", textDecoration: "none" }}>Randevular</Link>
        <Link to="/comments" style={{ color: "white", textDecoration: "none" }}>Yorumlar</Link>
        <Link to="/categories" style={{ color: "white", textDecoration: "none" }}>Kategoriler</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1 style={{ textAlign: "center", marginTop: "50px" }}>MBrandev - Randevu Sistemi</h1>} />
        <Route path="/register" element={<BusinessRegister />} />
        <Route path="/login" element={<BusinessLogin />} />
        <Route path="/appointments" element={<BusinessAppointments />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}