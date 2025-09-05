import { useGetAttendanceHistoryQuery } from "@/redux/features/attendance/attendanceApiSlice";
import React, { useState } from "react";

type Student = {
  id: number;
  name: string;
  email: string;
  status: "present" | "absent";
};

type AttendanceData = {
  date: string;
  students: Student[];
};

type AttendanceHistoryProps = {
  data: AttendanceData[];
};

const getMonthOptions = (data: AttendanceData[]) => {
  const months = new Set(data.map((entry) => entry.date.slice(0, 7)));
  return Array.from(months);
};

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ data }) => {
  const months = getMonthOptions(data);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const { data: currentData, isLoading } = useGetAttendanceHistoryQuery();
  const filteredData = data.filter((entry) =>
    entry.date.startsWith(selectedMonth),
  );
  console.log(currentData);
  if (!currentData || isLoading) return null;
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

      {currentData.map((data) => {
        const {} = data.sheet;
        return (
          <div key={data.date} className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">
              {new Date(data.date).toDateString()}
            </h3>
            <div className="overflow-x-auto">
              <table className="table-zebra table w-full">
                <thead>
                  <tr>
                    <th>UID</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.sheet.map((sheet, index) => {
                    console.log(sheet);
                    return (
                      <tr key={sheet._id}>
                        <th>{index + 1}</th>
                        <td>{sheet.student.name}</td>
                        <td>{"7"}</td>
                        <td>
                          <span
                            className={`badge ${
                              sheet.present ? "badge-success" : "badge-error"
                            }`}
                          >
                            {sheet.present ? "Present" : "Absent"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceHistory;
