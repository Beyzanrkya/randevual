import { useState } from "react";
import axios from "axios";

const API_URL = "https://randevual-beta.vercel.app";

export default function Categories() {
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState(null);
  const [message, setMessage] = useState("");

  const getCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/categories/${categoryId}`);
      setCategory(res.data);
      setMessage("✅ Kategori getirildi");
    } catch (err) {
      setMessage("❌ " + err.response?.data?.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <h2>Kategori Listeleme</h2>
      <form onSubmit={getCategory}>
        <input placeholder="Kategori ID" value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <button type="submit" style={{ padding: "10px 20px", background: "#9C27B0", color: "white", border: "none", cursor: "pointer" }}>
          Kategori Getir
        </button>
      </form>
      {message && <p>{message}</p>}
      {category && (
        <div>
          <h3>{category.category?.name}</h3>
          <p>{category.category?.description}</p>
          <h4>İşletmeler:</h4>
          <ul>
            {category.businesses?.map((b) => (
              <li key={b._id}>{b.name} - {b.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}