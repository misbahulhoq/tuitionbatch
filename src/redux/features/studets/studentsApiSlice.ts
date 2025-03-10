import { baseAPI } from "@/redux/api/api";

const studentApiSlice = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<void, void>({
      query: () => "/students",
    }),
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/students",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetStudentsQuery, useCreateStudentMutation } =
  studentApiSlice;
