import { baseAPI } from "@/redux/api/api";
import { Student } from "@/types/student.type";

const studentApiSlice = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
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
    updateStudentById: builder.mutation({
      query: (data) => ({
        url: `/students/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useDeleteStudentByIdMutation,
  useUpdateStudentByIdMutation,
} = studentApiSlice;
