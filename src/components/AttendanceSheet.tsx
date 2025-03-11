"use client";
import { useGetStudentsQuery } from "@/redux/features/studets/studentsApiSlice";
import React, { useState } from "react";
import Spinner from "./loaders/Spinner";

const AttendanceSheet = () => {
  // Sample student data
  const [student, setStudents] = useState([
    { id: 1, name: "John Doe", present: false },
    { id: 2, name: "Jane Smith", present: false },
    { id: 3, name: "Alice Johnson", present: false },
  ]);
  const [date, setDate] = useState(new Date());

  const { data: students, isLoading } = useGetStudentsQuery();
  console.log(date);

  // Function to toggle attendance
  const toggleAttendance = (id: number) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student,
      ),
    );
  };

  const handleAttendance = () => {
    const presentCount = students.filter((student) => student.present).length;
    alert(`Present: ${presentCount} / ${students.length}`);
    console.log({ presentCount, total: students.length, date });
    console.log(typeof date);
  };
  if (isLoading) return <Spinner />;

  return (
    <div className="mx-auto mt-5 max-w-2xl rounded-lg">
      <h1 className="mb-4 text-center text-2xl font-bold">Attendance Sheet</h1>

      <div className="mb-3 flex justify-center">
        {" "}
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
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="border-b">
              <td className="px-4 py-2">{student.id}</td>
              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => toggleAttendance(student.id)}
                  className={`btn rounded px-4 py-2 ${
                    student.present
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {student.present ? "Present" : "Absent"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5">
        <button className="btn btn-primary" onClick={handleAttendance}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AttendanceSheet;
