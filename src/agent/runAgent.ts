import { parse } from "../tools/parse.js";
import { tools } from "../tools.js";
import { generateICS } from "../tools/calendar.js";
import { decideNext } from "./decideNext.js";
import { Memory } from "../agent/memory.js";

export async function runAgent() {
  const memory: Memory = {
    finished: false,
  };

  while (!memory.finished) {
    const action = decideNext(memory);

    console.log("🧠 Agent Action:", action.type);

    switch (action.type) {
      case "OCR":
        memory.rawText = await tools.ocr(); // TODO: change real ocr tool
        break;

      case "PARSE":
        memory.courses = await parse(memory.rawText!);
        break;

      case "CALENDAR":
        generateICS(memory.courses!);
        memory.finished = true;
        break;
    }
  }
}
