export type Course = {
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  location?: string; // can be empty
};

export type ParseResult = {
  courses: Course[];
};
