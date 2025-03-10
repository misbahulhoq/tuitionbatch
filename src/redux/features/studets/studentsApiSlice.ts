import { baseAPI } from "@/redux/api/api";

const studentApiSlice = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<void, void>({
      query: () => "/students",
      providesTags: ["Students"],
    }),
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/students",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const { useGetStudentsQuery, useCreateStudentMutation } =
  studentApiSlice;
