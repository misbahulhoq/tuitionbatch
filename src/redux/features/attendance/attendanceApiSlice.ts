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
    getAttendance: builder.query<void, void>({
      query: () => "/attendance/current-date",
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
  useGetAttendanceQuery,
  useLazyGetAttendanceQuery,
  useUpdateAttendanceMutation,
} = attendanceApiSlice;
