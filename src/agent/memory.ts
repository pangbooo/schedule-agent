import { Course } from "../../types/index.js";

export type Memory = {
  rawText?: string;
  courses?: Course[];
  finished: boolean;
};
