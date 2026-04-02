const http = require("http");

const PORT = process.env.PORT || 3001;
const BAKONG_TOKEN = process.env.BAKONG_TOKEN;
const PROXY_SECRET = process.env.PROXY_SECRET;

if (!BAKONG_TOKEN || !PROXY_SECRET) {
  console.error("Missing required env vars: BAKONG_TOKEN, PROXY_SECRET");
  process.exit(1);
}

const server = http.createServer(async (req, res) => {
  // CORS headers for preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-proxy-key");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== "POST" || req.url !== "/proxy/verify") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  // Validate proxy secret
  if (req.headers["x-proxy-key"] !== PROXY_SECRET) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Unauthorized" }));
    return;
  }

  // Read request body
  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }

  try {
    // Forward to Bakong API
    const bakongRes = await fetch(
      "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BAKONG_TOKEN}`,
        },
        body,
      }
    );

    const data = await bakongRes.text();
    res.writeHead(bakongRes.status, { "Content-Type": "application/json" });
    res.end(data);
  } catch (err) {
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to reach Bakong API" }));
  }
});

server.listen(PORT, () => {
  console.log(`Bakong proxy running on port ${PORT}`);
});
