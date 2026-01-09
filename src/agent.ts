import { Memory } from "./memory.js"
import { tools } from "./tools.js"

export async function runAgent(imagePath: string) {
  const memory = new Memory()

  while (memory.state !== "COMPLETED") {
    switch (memory.state) {
      case "INIT":
        memory.ocrText = await tools.ocr(imagePath)
        memory.state = "OCR_DONE"
        break

      case "OCR_DONE":
        memory.courses = await tools.parse(memory.ocrText!)
        memory.state = "PARSED"
        break

      case "PARSED":
        await tools.calendar(memory.courses)
        memory.state = "COMPLETED"
        break
    }
  }

  console.log("✅ Agent 完成任务")
}
