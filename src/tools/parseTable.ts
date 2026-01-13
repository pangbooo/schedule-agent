import OpenAI from "openai";
import { Course, ParseResult } from "../../types/index.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function parseTable(
  tableText: string,
  year: number,
  month: number
): Promise<Course[]> {
  console.log("📊 LLM Table Parser 调用");

  const prompt = `
你是一个排班表解析助手。

下面是一份【按天排列的表格文本】，包含：
- 日期
- 班次（早番 / 中番 / 遅番）
- 每个班次对应的人名（可能带备注，如“14点”）

请你把它转换为 JSON 数组，每一条代表一个班次。

规则：
- date 使用 ${year}-${String(month).padStart(2, "0")}-DD
- 早番：09:00-18:00
- 中番：12:00-21:00
- 遅番：14:00-23:00
- title = 班次 + 人名（如：早番-杜晓阳）
- location 如果没有写，设为空字符串
- 如果某个单元格为空，跳过
- 只输出 JSON，不要解释

表格文本如下：
${tableText}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  console.log("Parsed Table Result:", res?.choices?.[0]?.message?.content);

  const parsed = JSON.parse(
    res?.choices?.[0]?.message?.content!
  ) as ParseResult;

  return parsed.courses ?? [];
}
