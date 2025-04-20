import React, { useState } from "react";

type Student = {
  id: number;
  name: string;
  email: string;
  status: "present" | "absent";
};

type AttendanceData = {
  date: string; // ISO date string, e.g., "2025-04-01"
  students: Student[];
};

type AttendanceHistoryProps = {
  data: AttendanceData[];
};

const getMonthOptions = (data: AttendanceData[]) => {
  const months = new Set(
    data.map((entry) => entry.date.slice(0, 7)), // YYYY-MM
  );
  return Array.from(months);
};

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ data }) => {
  const months = getMonthOptions(data);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const filteredData = data.filter((entry) =>
    entry.date.startsWith(selectedMonth),
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Attendance History</h2>
        <select
          className="select select-bordered w-48"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {new Date(month + "-01").toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </option>
          ))}
        </select>
      </div>

      {filteredData.map((entry) => (
        <div key={entry.date} className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">
            {new Date(entry.date).toDateString()}
          </h3>
          <div className="overflow-x-auto">
            <table className="table-zebra table w-full">
              <thead>
                <tr>
                  <th>UID</th>
                  <th>Name</th>
                  {/* <th>Email</th> */}
                  <th>Class</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {entry.students.map((student, index) => (
                  <tr key={student.id}>
                    <th>{index + 1}</th>
                    <td>{student.name}</td>
                    <td>{"7"}</td>
                    {/* <td>{student.email}</td> */}
                    <td>
                      <span
                        className={`badge ${
                          student.status === "present"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {student.status.charAt(0).toUpperCase() +
                          student.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceHistory;
