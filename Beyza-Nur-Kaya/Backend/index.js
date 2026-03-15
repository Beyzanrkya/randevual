const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();



const businessRoutes = require("./routes/businesses");
const appointmentRoutes = require("./routes/appointments");
const commentRoutes = require("./routes/comments");
const categoryRoutes = require("./routes/categories");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "MBrandev API çalışıyor!", version: "1.0.0" });
});



app.use("/businesses", businessRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/comments", commentRoutes);
app.use("/categories", categoryRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB bağlandı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

module.exports = app;