"use client";
import React, { useState } from "react";

const initialStudents = [
  { id: 1, name: "John Doe", status: "Present" },
  { id: 2, name: "Jane Smith", status: "Absent" },
  { id: 3, name: "Michael Brown", status: "Present" },
];

const AttendanceSheet = () => {
  const [students, setStudents] = useState(initialStudents);
  const [date, setDate] = useState(new Date());

  const toggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "Present" ? "Absent" : "Present",
            }
          : student,
      ),
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6 rounded-md bg-white p-4 shadow">
        <h2 className="mb-2 text-2xl">Attendance Sheet</h2>
        <input
          type="date"
          value={date.toISOString().substring(0, 10)}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="mb-4 rounded-md border p-2"
        />
      </div>

      <div className="rounded-md bg-white shadow">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.status}</td>
                <td className="p-2">
                  <button
                    onClick={() => toggleAttendance(student.id)}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceSheet;
