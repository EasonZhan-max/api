import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

app.use(cors({
  origin: allowedOrigin === "*" ? "*" : allowedOrigin.split(",").map(item => item.trim())
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function checkApiKey(req, res, next) {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: "服务器没有配置 OPENAI_API_KEY，请检查 .env 文件。"
    });
  }
  next();
}

app.get("/v1/status", (req, res) => {
  res.json({
    name: "Eason的中转站",
    status: "online",
    api: "ready",
    time: new Date().toISOString()
  });
});

app.get("/v1/models", checkApiKey, async (req, res) => {
  try {
    const models = await client.models.list();
    res.json(models);
  } catch (error) {
    res.status(500).json({
      error: "获取模型列表失败",
      detail: error.message
    });
  }
});

app.post("/v1/chat", checkApiKey, async (req, res) => {
  try {
    const { message, model = "gpt-4.1-mini" } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "请传入 message 字段，例如：{ \"message\": \"你好\" }"
      });
    }

    const response = await client.responses.create({
      model,
      input: message
    });

    res.json({
      reply: response.output_text,
      model
    });
  } catch (error) {
    res.status(500).json({
      error: "AI 接口调用失败",
      detail: error.message
    });
  }
});

app.post("/v1/chat/completions", checkApiKey, async (req, res) => {
  try {
    const { messages, model = "gpt-4.1-mini" } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "请传入 messages 数组。"
      });
    }

    const completion = await client.chat.completions.create({
      model,
      messages
    });

    res.json(completion);
  } catch (error) {
    res.status(500).json({
      error: "Chat Completions 调用失败",
      detail: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Eason的中转站已启动：http://localhost:${port}`);
});
