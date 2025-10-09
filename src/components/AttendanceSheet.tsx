"use client";
import { useGetStudentsQuery } from "@/redux/features/students/studentsApiSlice";
import React, { useEffect, useRef, useState } from "react";
import Spinner from "./loaders/Spinner";
import {
  useCreateAttendanceMutation,
  useLazyGetTodaysAttendanceSheetQuery,
} from "@/redux/features/attendance/attendanceApiSlice";
import Link from "next/link";
import { Sheet } from "@/types/attendance.type";
import AttendanceRow from "./attendance/AttendanceRow";

const AttendanceSheet = () => {
  const [date] = useState(new Date());
  const renderCount = useRef(0);
  const initialized = useRef(false);
  const { data: students, isLoading } = useGetStudentsQuery();
  const [createAttendanceSheet] = useCreateAttendanceMutation();
  const [
    triggerGetAttendance,
    { data: attendanceRecord, isLoading: isSheetLoading = true },
  ] = useLazyGetTodaysAttendanceSheetQuery();

  renderCount.current += 1;
  console.log(`Rendered ${renderCount.current} times`);

  useEffect(() => {
    if (initialized.current) return;
    if (Array.isArray(students) && students.length > 0) {
      initialized.current = true;
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
  }, [students, createAttendanceSheet, triggerGetAttendance]);

  console.log({ isLoading, isSheetLoading });

  if (isLoading || isSheetLoading || !attendanceRecord)
    return (
      <div className="flex h-[100dvh] items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <small className="block">Sheet is loading.</small>
          <Spinner />
        </div>
      </div>
    );

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
      </div>

      <div className="mb-3 flex justify-center">
        <h2>{date.toDateString()}</h2>
      </div>

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
