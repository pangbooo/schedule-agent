import readline from "readline";
import { runAgent } from "./agent/runAgent.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("按 Enter 开始解析课程表...", async () => {
  await runAgent();
  console.log("✅ 已生成 schedule.ics");
  rl.close();
});
