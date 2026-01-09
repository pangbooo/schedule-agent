export const tools = {
  ocr: async (imagePath: string) => {
    console.log("📷 OCR 处理中:", imagePath)
    return `
      3/12 13:00-14:30 软件工程 教室A
      3/13 10:00-12:00 数据库 教室B
    `
  },

  parse: async (text: string) => {
    console.log("🧩 解析课程文本")
    return [
      {
        title: "软件工程",
        date: "2026-03-12",
        startTime: "13:00",
        endTime: "14:30",
        location: "教室A"
      }
    ]
  },

  calendar: async (courses: any[]) => {
    console.log("📅 写入日历:", courses)
    return true
  }
}
