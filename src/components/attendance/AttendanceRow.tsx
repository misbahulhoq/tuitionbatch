import { useUpdateAttendanceMutation } from "@/redux/features/attendance/attendanceApiSlice";
import { Sheet, Student } from "@/types/attendance.type";
import React from "react";

const AttendanceRow = ({ sheet }: { sheet: Sheet }) => {
  const { student } = sheet;
  const { _id, uid, name } = student;
  const [updateAttendance] = useUpdateAttendanceMutation();
  const toggleAttendance = (studentId: string) => {
    updateAttendance({
      // eslint-disable-next-line
      // @ts-ignore
      attendanceId: attendanceSheet[0]._id,
      studentId,
    });
  };
  return (
    <tr className="border-b">
      <td className="px-4 py-2 text-center">{uid}</td>
      <td className="px-4 py-2 text-center">{name}</td>
      <td className="px-4 py-2 text-center">
        <button
          onClick={() => toggleAttendance(sheet?.student?._id)}
          className={`btn btn-lg rounded ${
            sheet.present
              ? "bg-success text-success-content"
              : "bg-error text-white"
          }`}
        >
          {sheet.present ? "Present" : "Absent"}
        </button>
      </td>
    </tr>
  );
};

export default AttendanceRow;
