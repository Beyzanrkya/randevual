import { useState } from "react";
import axios from "axios";

const API_URL = "https://randevual-beta.vercel.app";

export default function Comments() {
  const [addForm, setAddForm] = useState({ businessId: "", text: "", rating: 5 });
  const [updateForm, setUpdateForm] = useState({ id: "", text: "", rating: 5 });
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/comments`, addForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("✅ " + res.data.message);
    } catch (err) {
      setMessage("❌ " + err.response?.data?.message);
    }
  };

  const updateComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/comments/${updateForm.id}`,
        { text: updateForm.text, rating: updateForm.rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ " + res.data.message);
    } catch (err) {
      setMessage("❌ " + err.response?.data?.message);
    }
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}/comments/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("✅ Yorum silindi");
    } catch (err) {
      setMessage("❌ " + err.response?.data?.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <h2>Yorum İşlemleri</h2>

      <h3>Yorum Ekle</h3>
      <form onSubmit={addComment}>
        <input placeholder="İşletme ID" value={addForm.businessId}
          onChange={(e) => setAddForm({ ...addForm, businessId: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input placeholder="Yorum" value={addForm.text}
          onChange={(e) => setAddForm({ ...addForm, text: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input type="number" min="1" max="5" placeholder="Puan (1-5)" value={addForm.rating}
          onChange={(e) => setAddForm({ ...addForm, rating: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <button type="submit" style={{ padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
          Yorum Ekle
        </button>
      </form>

      <h3>Yorum Güncelle</h3>
      <form onSubmit={updateComment}>
        <input placeholder="Yorum ID" value={updateForm.id}
          onChange={(e) => setUpdateForm({ ...updateForm, id: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input placeholder="Yeni Yorum" value={updateForm.text}
          onChange={(e) => setUpdateForm({ ...updateForm, text: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input type="number" min="1" max="5" placeholder="Puan (1-5)" value={updateForm.rating}
          onChange={(e) => setUpdateForm({ ...updateForm, rating: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <button type="submit" style={{ padding: "10px 20px", background: "#FF9800", color: "white", border: "none", cursor: "pointer" }}>
          Güncelle
        </button>
      </form>

      <h3>Yorum Sil</h3>
      <form onSubmit={deleteComment}>
        <input placeholder="Yorum ID" value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <button type="submit" style={{ padding: "10px 20px", background: "#f44336", color: "white", border: "none", cursor: "pointer" }}>
          Sil
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}