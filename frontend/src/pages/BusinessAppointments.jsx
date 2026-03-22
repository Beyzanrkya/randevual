import { useState } from "react";
import axios from "axios";

const API_URL = "https://randevual-beta.vercel.app";

export default function BusinessAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [updateForm, setUpdateForm] = useState({ id: "", date: "", time: "", status: "confirmed" });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const businessId = localStorage.getItem("businessId");

  const getAppointments = async () => {
    try {
      const res = await axios.get(`${API_URL}/appointments?businessId=${businessId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data.appointments);
      setMessage("✅ Randevular getirildi");
    } catch (err) {
      setMessage("❌ " + err.response?.data?.message);
    }
  };

  const updateAppointment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/appointments/${updateForm.id}`,
        { date: updateForm.date, time: updateForm.time, status: updateForm.status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ " + res.data.message);
    } catch (err) {
      setMessage("❌ " + err.response?.data?.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <h2>Randevu İşlemleri</h2>
      <button onClick={getAppointments} style={{ padding: "10px 20px", background: "#2196F3", color: "white", border: "none", cursor: "pointer", marginBottom: "20px" }}>
        Randevuları Listele
      </button>

      {appointments.length > 0 && (
        <ul>
          {appointments.map((a) => (
            <li key={a._id}>{a.date} - {a.time} - {a.status}</li>
          ))}
        </ul>
      )}

      <h3>Randevu Güncelle</h3>
      <form onSubmit={updateAppointment}>
        <input placeholder="Randevu ID" value={updateForm.id}
          onChange={(e) => setUpdateForm({ ...updateForm, id: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input placeholder="Tarih (2026-04-10)" value={updateForm.date}
          onChange={(e) => setUpdateForm({ ...updateForm, date: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input placeholder="Saat (14:00)" value={updateForm.time}
          onChange={(e) => setUpdateForm({ ...updateForm, time: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }} />
        <select value={updateForm.status}
          onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}>
          <option value="pending">Bekliyor</option>
          <option value="confirmed">Onaylandı</option>
          <option value="cancelled">İptal</option>
        </select>
        <button type="submit" style={{ padding: "10px 20px", background: "#FF9800", color: "white", border: "none", cursor: "pointer" }}>
          Güncelle
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}