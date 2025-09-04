import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// Разрешаем все домены (или конкретно localhost:5173 + твой прод-домен)
app.use(cors({
  origin: ["http://localhost:5173", "https://gfcc-personal.netlify.app"], // свой домен потом добавишь
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const GOOGLE_API = "https://script.google.com/macros/s/AKfycbxxToWj8XjXKr5rOgd3ey-lFRB_p1TUIkU2NREyQTJQSTm6BAasAHkadeNQuJ7GYY5y/exec";

app.get("/api/employees", async (req, res) => {
  try {
    const resp = await fetch(GOOGLE_API);
    const text = await resp.text();
    const data = JSON.parse(text);
    res.json(data);
  } catch (err) {
    console.error("Ошибка сервера:", err);
    res.status(500).json({ error: "Не удалось получить данные" });
  }
});

app.post("/api/employees", async (req, res) => {
  try {
    const resp = await fetch(GOOGLE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const text = await resp.text();
    const data = JSON.parse(text);
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
