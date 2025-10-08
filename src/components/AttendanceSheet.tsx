"use client";
import { useGetStudentsQuery } from "@/redux/features/students/studentsApiSlice";
import React, { useEffect, useState } from "react";
import Spinner from "./loaders/Spinner";
import {
  useCreateAttendanceMutation,
  useLazyGetTodaysAttendanceSheetQuery,
} from "@/redux/features/attendance/attendanceApiSlice";
import Link from "next/link";
import { Sheet } from "@/types/attendance.type";
import AttendanceRow from "./attendance/AttendanceRow";
import { FaCamera } from "react-icons/fa";
import FaceMatcher from "./FaceMatcher";

const AttendanceSheet = () => {
  const [date] = useState(new Date());
  const { data: students, isLoading } = useGetStudentsQuery();
  const [createAttendanceSheet] = useCreateAttendanceMutation();
  const [, setIsFaceMatcherOpen] = useState(false);
  const [triggerGetAttendance, { data: attendanceRecord }] =
    useLazyGetTodaysAttendanceSheetQuery();
  useEffect(() => {
    if (Array.isArray(students) && students.length > 0) {
      createAttendanceSheet({
        date: new Date().toISOString(),
        sheet: students.map((s) => ({ student: s._id })),
      })
        .unwrap()
        .then(() => {
          triggerGetAttendance();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [students, createAttendanceSheet, date, triggerGetAttendance]);

  if (isLoading) return <Spinner />;

  if (Array.isArray(students) && students.length === 0)
    return (
      <div className="flex h-screen items-center justify-center text-lg">
        Get started by
        <Link href={"/students/create"} className="ml-2 underline">
          adding students
        </Link>
      </div>
    );

  return (
    <div className="mx-auto mt-5 max-w-2xl rounded-lg text-lg">
      <div className="mb-4 flex items-center justify-center gap-4">
        <h1 className="text-center text-2xl font-bold">Attendance Sheet</h1>
        <button
          className="btn btn-outline"
          onClick={() => {
            setIsFaceMatcherOpen(!open);
          }}
        >
          <FaCamera size={20} />
        </button>
      </div>

      <div className="mb-3 flex justify-center">
        <h2>{date.toDateString()}</h2>
      </div>

      {/* {isFaceMatcherOpen && <FaceMatcher />} */}
      <FaceMatcher />

      <table className="w-full">
        <thead>
          <tr className="bg-base-300">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecord?.sheet?.map((sheet: Sheet) => {
            return (
              <AttendanceRow
                key={sheet._id}
                sheet={sheet}
                attendanceRecord={attendanceRecord}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceSheet;
