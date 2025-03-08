"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  level: number;
}

const AddStudentPage = () => {
  const { data: session } = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    const studentdata = { ...data, teacher: session?.user?.email };
    console.log(studentdata);
  };
  return (
    <section className="container-center flex justify-center">
      <div className="py-3">
        <h2 className="mb-3 text-xl font-bold">Add New Student</h2>
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

          <div className="form-conrol">
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
          </div>

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
            <button className="btn btn-primary mt-2">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStudentPage;
