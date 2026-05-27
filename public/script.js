const btn = document.querySelector("#sendBtn");
const input = document.querySelector("#message");
const result = document.querySelector("#result");

btn.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) {
    result.textContent = "请输入内容";
    return;
  }

  btn.disabled = true;
  btn.textContent = "请求中...";
  result.textContent = "正在请求 /v1/chat ...";

  try {
    const res = await fetch("/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    result.textContent = "请求失败：" + error.message;
  } finally {
    btn.disabled = false;
    btn.textContent = "发送请求";
  }
});
