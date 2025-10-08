import { Student } from "./student.type";

type SheetEntry = {
  student: Student;
  present: boolean;
  _id: string;
};

export type Sheet = {
  student: {
    _id: string;
    name: string;
    uid: string;
    level: string;
    teacher: string;
  };
  present: boolean;
  _id: string;
};
export type AttendanceRecord = {
  _id: string;
  date: string;
  formattedDate: string;
  sheet: SheetEntry[];
  teacher: string;
  createdAt: string;
  updatedAt: string;
};
