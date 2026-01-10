import { Course } from "../types/index.js";

export function validateCourses(courses: Course[]): string[] {
  const errors: string[] = [];

  for (const c of courses) {
    if (!c.title) errors.push("缺少课程名称");
    if (!c.date) errors.push(`课程 ${c.title} 缺少日期`);
    if (!c.startTime || !c.endTime)
      errors.push(`课程 ${c.title} 缺少时间`);
  }

  return errors;
}

export function hasTimeConflict(courses: Course[]): boolean {
  const byDate: Record<string, Course[]> = {};

  for (const c of courses) {
    (byDate[c.date] ||= []).push(c);
  }

  for (const date in byDate) {
    const list = byDate[date]!.sort(
      (a, b) => a.startTime.localeCompare(b.startTime)
    );

    for (let i = 1; i < list.length; i++) {
      if (list[i]!.startTime < list[i - 1]!.endTime) {
        return true;
      }
    }
  }

  return false;
}
