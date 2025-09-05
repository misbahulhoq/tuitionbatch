import { baseAPI } from "@/redux/api/api";

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
    getAttendanceHistory: builder.query<void, void>({
      query: () => "/attendance/history",
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
  useGetAttendanceHistoryQuery,
  useLazyGetAttendanceHistoryQuery,
  useUpdateAttendanceMutation,
} = attendanceApiSlice;
