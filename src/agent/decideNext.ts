import { Memory } from "./memory.js";

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

  return { type: "CALENDAR" };
}
