import { useUpdateAttendanceMutation } from "@/redux/features/attendance/attendanceApiSlice";
import { AttendanceRecord, Sheet } from "@/types/attendance.type";
import React, { useState } from "react";

const AttendanceRow = ({
  sheet,
  attendanceRecord,
}: {
  sheet: Sheet;
  attendanceRecord: AttendanceRecord;
}) => {
  const { student } = sheet;
  const { uid, name } = student;
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [present, setPresent] = useState<boolean>(sheet?.present);

  const displayPresentStatus = (status: boolean) => {
    let result = "";
    if (status === true) {
      result = "Present";
    } else {
      result = "Absent";
    }
    return result;
  };
  const toggleAttendance = (studentId: string) => {
    setPresent(!present);
    updateAttendance({
      attendanceId: attendanceRecord?._id,
      studentId,
    });
  };
  return (
    <tr className="border-b text-[15px]">
      <td className="px-4 py-2 text-center">{uid}</td>
      <td className="px-4 py-2 text-center">{name}</td>
      <td className="px-4 py-2 text-center">
        <button
          onClick={() => toggleAttendance(sheet?.student?._id)}
          className={`btn rounded ${
            present ? "bg-success text-success-content" : "bg-error text-white"
          }`}
        >
          {displayPresentStatus(present)}
        </button>
      </td>
    </tr>
  );
};

export default AttendanceRow;
