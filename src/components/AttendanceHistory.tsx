import { useGetAttendanceHistoryQuery } from "@/redux/features/attendance/attendanceApiSlice";
import React, { useCallback, useRef, useState } from "react";

const AttendanceHistory: React.FC = () => {
  const [limit, setLimit] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState<string>();

  const { data, isLoading } = useGetAttendanceHistoryQuery({
    limit,
    month: selectedMonth,
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

  if (!data || isLoading) return null;
  console.log(Boolean(selectedMonth));
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Attendance History</h2>
        <select
          className="select select-bordered w-48"
          value={selectedMonth as string}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="All">All month</option>
          {data?.monthFilter?.map((month) => (
            <option key={month} value={month}>
              {new Date(month + "-01").toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </option>
          ))}
        </select>
      </div>

      {data?.attendance?.map((data) => {
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
