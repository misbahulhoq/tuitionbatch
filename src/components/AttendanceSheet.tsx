"use client";
import { useGetStudentsQuery } from "@/redux/features/studets/studentsApiSlice";
import React, { useEffect, useState } from "react";
import Spinner from "./loaders/Spinner";
import {
  useCreateAttendanceMutation,
  useGetAttendanceQuery,
  useLazyGetAttendanceQuery,
} from "@/redux/features/attendance/attendanceApiSlice";

const AttendanceSheet = () => {
  const [date, setDate] = useState(new Date());
  const { data: students, isLoading } = useGetStudentsQuery();
  const [createAttendanceSheet] = useCreateAttendanceMutation();
  const { data } = useGetAttendanceQuery();
  const [
    triggerGetAttendance,
    { data: attendanceSheet, isLoading: isGettingAttendanceSheet },
  ] = useLazyGetAttendanceQuery();
  console.log(attendanceSheet);
  useEffect(() => {
    if (Array.isArray(students)) {
      createAttendanceSheet({
        date,
        sheet: students.map((s) => ({ student: s._id })),
      })
        .unwrap()
        .then((res) => {
          triggerGetAttendance();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [students]);

  if (isLoading) return <Spinner />;

  return (
    <div className="mx-auto mt-5 max-w-2xl rounded-lg">
      <h1 className="mb-4 text-center text-2xl font-bold">Attendance Sheet</h1>

      <div className="mb-3 flex justify-center">
        <input
          type="datetime-local"
          onChange={(e) => {
            setDate(new Date(e.target.value));
            console.log(e.target.value);
          }}
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-base-300">
            <th className="px-4 py-2">UID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(attendanceSheet) &&
            attendanceSheet[0]?.sheet?.map((sheet) => (
              <tr key={sheet._id} className="border-b">
                <td className="px-4 py-2 text-center">{sheet.student.uid}</td>
                <td className="px-4 py-2 text-center">{sheet.student.name}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    // onClick={() => toggleAttendance(student.id)}
                    className={`btn rounded px-4 py-2 ${
                      sheet.student.present
                        ? "bg-success text-success-content"
                        : "bg-error text-white"
                    }`}
                  >
                    {sheet.student.present ? "Present" : "Absent"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-5">
        <button
          className="btn btn-primary"
          // onClick={handleAttendance}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AttendanceSheet;
