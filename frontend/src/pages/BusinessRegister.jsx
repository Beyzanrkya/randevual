import { useState } from "react";
import axios from "axios";

const API_URL = "https://randevual-beta.vercel.app";

export default function BusinessRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/businesses/register`, form);
      setMessage("✅ " + res.data.message);
    } catch (err) {
      setMessage("❌ " + err.response?.data?.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>İşletme Kayıt</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="İşletme Adı" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input type="password" placeholder="Şifre" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <button type="submit" style={{ padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
          Kayıt Ol
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}