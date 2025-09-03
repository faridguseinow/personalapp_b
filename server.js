import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const GOOGLE_API = "https://script.google.com/macros/s/AKfycbyZ4ZC6Jsk1rQMc_IdqkCgDsXHtJrMtEWw3ygLbmqmNa0klTeeF4c8xiPcXbAd3SBC8/exec";

// Получить сотрудников
app.get("/api/employees", async (req, res) => {
  try {
    const resp = await fetch(GOOGLE_API, {
      headers: { "Content-Type": "application/json" }
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error("Ошибка сервера:", err);
    res.status(500).json({ error: "Не удалось получить данные" });
  }
});

// Обновить / добавить сотрудника
app.post("/api/employees", async (req, res) => {
  try {
    const resp = await fetch(GOOGLE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error("Ошибка сервера:", err);
    res.status(500).json({ error: "Не удалось обновить данные" });
  }
});

app.get("/", (req, res) => {
  res.send("✅ PersonalApp Backend работает! Используй /api/employees для данных.");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Proxy server running on ${PORT}`));
