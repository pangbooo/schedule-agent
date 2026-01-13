import OpenAI from "openai";
import { Course, ParseResult } from "../../types/index.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function parse(text: string): Promise<Course[]> {
  console.log("🤖 LLM Parser Tool 调用");

  const prompt = `
你是一个课程表解析助手。

请严格按照以下 JSON Schema 返回结果：

{
  "courses": [
    {
      "title": string,
      "date": "YYYY-MM-DD",
      "startTime": "HH:mm",
      "endTime": "HH:mm",
      "location": string
    }
  ]
}

规则：
- 如果某字段缺失，请返回空字符串
- 如果无法解析任何课程，返回 courses: []
- 只返回 JSON，不要解释

文本如下：
${text}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  console.log("Parsed Result:", res?.choices?.[0]?.message?.content);

  const parsed = JSON.parse(
    res?.choices?.[0]?.message?.content!
  ) as ParseResult;

  return parsed.courses ?? [];
}
