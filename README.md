Start
↓
接收输入（image / excel）
↓
Agent 判断：有没有可用文本？
↓
没有 → OCR / Excel Tool
有 → 继续
↓
LLM Parser Tool（文本 → 课程 JSON）
↓
Validator（合法性 / 冲突）
↓
是否需要用户确认？
↓
Calendar Tool（生成 .ics / 写日历）
↓
Done
