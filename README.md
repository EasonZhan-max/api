# Eason的中转站 - ChatGPT API 后端中转完整模板

这是一个可运行的 Node.js + Express 后端项目，包含：

- 官网前端页面
- `/v1/status` 服务状态
- `/v1/chat` 简单对话接口
- `/v1/chat/completions` 兼容 Chat Completions 接口
- `/v1/models` 模型列表接口
- 安全的 `.env` API Key 配置方式

## 重要安全提醒

你刚才发出来的 API Key 已经暴露，建议立刻去 OpenAI 控制台删除/轮换，然后创建新的 API Key。

不要把真实 API Key 写进：

- HTML
- JS
- GitHub 公开仓库
- 前端 fetch 请求
- 聊天截图或公开页面

## 使用方法

### 1. 安装 Node.js

建议使用 Node.js 18 或以上版本。

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 API Key

复制：

```bash
cp .env.example .env
```

Windows 可以手动复制 `.env.example` 并改名为 `.env`。

然后打开 `.env`，填入你的新 API Key：

```env
OPENAI_API_KEY=sk-your-new-api-key-here
PORT=3000
ALLOWED_ORIGIN=*
```

### 4. 启动

```bash
npm start
```

打开：

```txt
http://localhost:3000
```

## 测试接口

```bash
curl -X POST http://localhost:3000/v1/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"你好\"}"
```

## 部署建议

可以部署到：

- Railway
- Render
- Vercel Serverless / Node
- 宝塔面板 Node 项目
- VPS + PM2 + Nginx

正式部署时建议：

- 把 `ALLOWED_ORIGIN` 改成你的网站域名
- 给接口增加自己的用户鉴权
- 增加限流
- 增加日志
- 不要公开真实 API Key
