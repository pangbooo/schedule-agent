import http from "http";
import { runAgent } from "./src/agent/runAgent.js";

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/run") {
    try {
      await runAgent();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true }));
    } catch (e: any) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
