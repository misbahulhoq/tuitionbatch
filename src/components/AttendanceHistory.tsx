import { useGetAttendanceHistoryQuery } from "@/redux/features/attendance/attendanceApiSlice";
import React from "react";

const AttendanceHistory: React.FC = () => {
  const { data: currentData, isLoading } = useGetAttendanceHistoryQuery();
  console.log(currentData);
  if (!currentData || isLoading) return null;
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Attendance History</h2>
        {/* <select
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
        </select> */}
      </div>

      {currentData.map((data) => {
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
