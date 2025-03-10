"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useCreateStudentMutation } from "@/redux/features/studets/studentsApiSlice";
import Swal from "sweetalert2";
export interface IStudent {
  name: string;
  // email: string;
  level: number;
}
const AddStudentForm = () => {
  const { data: session } = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IStudent>();
  const [addNewStudent, { isLoading }] = useCreateStudentMutation();
  const onSubmit = (data: IStudent) => {
    const studentdata = { ...data, teacher: session?.user?.email };
    console.log(studentdata);
    addNewStudent(studentdata)
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Student Added Successfully",
        });
        reset();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: err?.data?.message,
        });
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mb-2">
          <input
            type="text"
            placeholder="Enter Student's Name."
            className="input input-bordered w-full max-w-xs"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && (
            <p className="text-error text-sm">Name is required.</p>
          )}
        </div>

        {/* <div className="form-conrol">
            <input
              type="email"
              placeholder="Enter Student's Email."
              className="input input-bordered w-full max-w-xs"
              {...register("email", {
                required: { message: "Email is required.", value: true },
              })}
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email.message}</p>
            )}
          </div> */}

        <div className="form-conrol mt-2">
          <input
            type="number"
            placeholder="Enter level. e.g. 8"
            className="input input-bordered w-full max-w-xs"
            {...register("level", {
              required: { message: "Level is required.", value: true },
            })}
          />
          {errors.level && (
            <p className="text-error text-sm">{errors.level.message}</p>
          )}
        </div>

        <div className="flex w-full max-w-xs justify-end">
          <button className="btn btn-primary mt-2" disabled={isLoading}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
