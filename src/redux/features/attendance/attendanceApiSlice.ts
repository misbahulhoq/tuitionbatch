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
  }),
});

export const {
  useCreateAttendanceMutation,
  useGetAttendanceQuery,
  useLazyGetAttendanceQuery,
} = attendanceApiSlice;
