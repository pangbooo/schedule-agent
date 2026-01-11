import { Memory } from "./memory.js";
import { tools } from "./tools.js";
import { generateICS, parse } from "./tools/index.js";
import { validateCourses, hasTimeConflict } from "./validator.js";

export async function runAgent(imagePath: string) {
  const memory = new Memory();

  while (memory.state !== "COMPLETED") {
    switch (memory.state) {
      case "INIT":
        memory.ocrText = await tools.ocr(imagePath);
        memory.state = "OCR_DONE";
        break;

      case "OCR_DONE":
        memory.courses = await parse(memory.ocrText!);
        memory.state = "PARSED";
        break;

      case "PARSED":
        const errors = validateCourses(memory.courses);
        if (hasTimeConflict(memory.courses)) {
          errors.push("发现课程时间冲突（时间重叠）。");
        }

        if (errors.length > 0) {
          throw new Error("解析结果不合法:\n" + errors.join("\n"));
        }

        await tools.calendar(memory.courses);
        memory.state = "VALIDATED";
        break;

      case "VALIDATED":
        generateICS(memory.courses);
        memory.state = "COMPLETED";
        break;
    }
  }

  console.log("✅ Agent 完成任务");
}
