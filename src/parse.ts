import OpenAI from "openai";
import { Course } from "../types/index.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function parse(text: string): Promise<Course[]> {
  console.log("🤖 LLM Parser Tool 调用")

  const prompt = `
你是一个课程表解析助手。

请从以下文本中，提取所有课程信息，返回 JSON 数组。

要求：
- date: YYYY-MM-DD
- startTime / endTime: HH:mm
- location 如果没有就为空字符串
- 只输出 JSON，不要解释

文本如下：
${text}
`

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" }
  })

  return JSON.parse(res?.choices?.[0]?.message.content!) || [];
}
