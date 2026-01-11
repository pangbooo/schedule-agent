import { Memory } from "./memory.js";
import { hasTimeConflict, validateCourses } from "./validator.js";

export type Action =
  | { type: "OCR" }
  | { type: "PARSE" }
  | { type: "VALIDATE" }
  | { type: "CALENDAR" }
  | { type: "DONE" };

export function decideNext(memory: Memory): Action {
  if (!memory.rawText) {
    return { type: "OCR" };
  }

  if (!memory.courses) {
    return { type: "PARSE" };
  }

  const errors = validateCourses(memory.courses);
  if (errors.length > 0) {
    throw new Error("校验失败:\n" + errors.join("\n"));
  }

  if (hasTimeConflict(memory.courses)) {
    throw new Error("课程时间存在冲突");
  }

  return { type: "CALENDAR" };
}
