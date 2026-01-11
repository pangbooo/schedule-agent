import fs from "fs";
import { Course } from "../../types/index.js";

export function generateICS(courses: Course[]) {
  let content = "BEGIN:VCALENDAR\nVERSION:2.0\n";

  for (const c of courses) {
    content += `
BEGIN:VEVENT
SUMMARY:${c.title}
DTSTART:${c.date.replace(/-/g, "")}T${c.startTime.replace(":", "")}00
DTEND:${c.date.replace(/-/g, "")}T${c.endTime.replace(":", "")}00
LOCATION:${c.location || ""}
END:VEVENT
`;
  }

  content += "END:VCALENDAR";
  fs.writeFileSync("schedule.ics", content);
}
