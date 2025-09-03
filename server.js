import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// включаем CORS
app.use(cors());

// твой Google Apps Script API
const GOOGLE_API = "https://script.google.com/macros/s/AKfycbx6xSTL-86GeA9g5Pjuau4eifmqZVo5djr.../exec";

// роут для сотрудников
app.get("/api/employees", async (req, res) => {
  try {
    const response = await fetch(GOOGLE_API);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Ошибка сервера:", err);
    res.status(500).json({ error: "Не удалось получить данные" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
