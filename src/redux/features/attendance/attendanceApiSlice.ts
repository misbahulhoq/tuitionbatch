import { baseAPI } from "@/redux/api/api";
import { AttendanceRecord } from "@/types/attendance.type";

const attendanceApiSlice = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createAttendance: builder.mutation({
      query: (data) => ({
        url: "/attendance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Attendance"],
    }),
    getAttendanceHistory: builder.query<
      { attendance: AttendanceRecord[]; monthFilter: string[] },
      { limit: number; month?: string }
    >({
      query: (body) => ({
        url: `/attendance/history?limit=${body.limit}${body.month ? `&month=${body.month}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Attendance"],
    }),
    getTodaysAttendanceSheet: builder.query<void, void>({
      query: () =>
        `/attendance/current-date?date=${new Date().toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        )}`,
      providesTags: ["Attendance"],
    }),
    updateAttendance: builder.mutation({
      query: (body) => {
        return {
          url: `/attendance/${body.attendanceId}/${body.studentId}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useCreateAttendanceMutation,
  useGetTodaysAttendanceSheetQuery,
  useLazyGetTodaysAttendanceSheetQuery,
  useGetAttendanceHistoryQuery,
  useLazyGetAttendanceHistoryQuery,
  useUpdateAttendanceMutation,
} = attendanceApiSlice;
