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
    deleteStudentById: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useDeleteStudentByIdMutation,
} = studentApiSlice;
