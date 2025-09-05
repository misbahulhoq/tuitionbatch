"use client";
import { useGetStudentsQuery } from "@/redux/features/students/studentsApiSlice";
import React, { useEffect, useState } from "react";
import Spinner from "./loaders/Spinner";
import {
  useCreateAttendanceMutation,
  useLazyGetTodaysAttendanceSheetQuery,
  useUpdateAttendanceMutation,
} from "@/redux/features/attendance/attendanceApiSlice";
import Link from "next/link";
type Sheet = {
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

const AttendanceSheet = () => {
  const [date] = useState(new Date());
  const { data: students, isLoading } = useGetStudentsQuery();
  const [createAttendanceSheet] = useCreateAttendanceMutation();
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [triggerGetAttendance, { data: attendanceSheet }] =
    useLazyGetTodaysAttendanceSheetQuery();
  console.log(attendanceSheet);

  useEffect(() => {
    if (Array.isArray(students)) {
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

  const toggleAttendance = (studentId: string) => {
    if (attendanceSheet)
      updateAttendance({
        // eslint-disable-next-line
        // @ts-ignore
        attendanceId: attendanceSheet[0]._id,
        studentId,
      });
  };

  if (isLoading) return <Spinner />;

  if (Array.isArray(students) && students.length === 0)
    return (
      <div className="flex h-screen items-center justify-center text-lg">
        Get started by
        <Link href={"/students/create"} className="ml-2 underline">
          {" "}
          adding students
        </Link>
      </div>
    );

  return (
    <div className="mx-auto mt-5 max-w-2xl rounded-lg text-lg">
      <h1 className="mb-4 text-center text-2xl font-bold">Attendance Sheet</h1>
      <div className="mb-3 flex justify-center">
        <h2>{date.toDateString()}</h2>
        {/* <input
          type="datetime-local"
          onChange={(e) => {
            setDate(new Date(e.target.value));
          }}
        /> */}
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
            attendanceSheet[0]?.sheet?.map((sheet: Sheet) => {
              return (
                <tr key={sheet._id} className="border-b">
                  <td className="px-4 py-2 text-center">
                    {sheet?.student?.uid}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {sheet?.student?.name}
                  </td>
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
            })}
        </tbody>
      </table>
      <div className="mt-5">
        {/* <button
          className="btn btn-primary"
          // onClick={handleAttendance}
        >
          Submit
        </button> */}
      </div>
    </div>
  );
};

export default AttendanceSheet;
