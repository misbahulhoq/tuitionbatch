import { useGetAttendanceHistoryQuery } from "@/redux/features/attendance/attendanceApiSlice";
import React, { useCallback, useRef, useState } from "react";

const AttendanceHistory: React.FC = () => {
  const [limit, setLimit] = useState(10);
  const { data: currentData, isLoading } = useGetAttendanceHistoryQuery({
    limit,
  });
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setSentinelRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLimit((prev) => prev + 10);
        }
      });

      observerRef.current.observe(node);
    }
  }, []);

  if (!currentData || isLoading) return null;
  console.log(limit);
  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-between">
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
                  {data.sheet.map((sheet) => {
                    const { student } = sheet || {};
                    const { name, level, uid } = student || {};
                    return (
                      <tr key={sheet._id}>
                        <th>{uid}</th>
                        <td>{name}</td>
                        <td>{level}</td>
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

      <div ref={setSentinelRef} className="h-10"></div>
    </div>
  );
};

export default AttendanceHistory;
