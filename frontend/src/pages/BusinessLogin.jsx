import { useState } from "react";
import axios from "axios";

const API_URL = "https://randevual-beta.vercel.app";

export default function BusinessLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/businesses/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("businessId", res.data.business._id);
      setMessage("✅ " + res.data.message);
    } catch (err) {
      setMessage("❌ " + err.response?.data?.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>İşletme Giriş</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input type="password" placeholder="Şifre" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <button type="submit" style={{ padding: "10px 20px", background: "#2196F3", color: "white", border: "none", cursor: "pointer" }}>
          Giriş Yap
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}