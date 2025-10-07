"use client";
import FaceEnrollment from "@/components/FaceEnrollment";
import Spinner from "@/components/loaders/Spinner";
import AddStudentForm from "@/components/shared/AddStudentForm";
import {
  useDeleteStudentByIdMutation,
  useGetStudentsQuery,
} from "@/redux/features/students/studentsApiSlice";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const StudentsPage = () => {
  const { data, isLoading } = useGetStudentsQuery();
  console.log(data);
  if (isLoading) return <Spinner />;
  return (
    <div className="container-center my-3">
      <div className="mb-3 flex justify-end">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            document.getElementById("my_modal_1")?.classList.add("modal-open");
          }}
        >
          Add New
        </button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <AddStudentForm />
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={() => {
                  document
                    .getElementById("my_modal_1")
                    ?.classList.remove("modal-open");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(data) &&
          data.map((student) => {
            return <StudentCard key={student._id} props={student} />;
          })}
      </div>
    </div>
  );
};

export default StudentsPage;

interface IStudent {
  _id: string;
  name: string;
  level: number;
  uid: string;
}
const StudentCard = ({ props }: { props: IStudent }) => {
  const { _id, name, level, uid } = props || {};
  const [deleteStudentById] = useDeleteStudentByIdMutation();

  const handleDelete = (_id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudentById(_id)
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Student has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: err?.data?.message,
            });
          });
      }
    });
  };
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Class: {level}</p>
        <p>UID: {uid}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-error btn-outline"
            onClick={() => handleDelete(_id)}
          >
            Delete
          </button>

          <button
            className="btn btn-primary"
            onClick={() => {
              document
                .getElementById("update_student_modal")
                ?.classList.add("modal-open");
            }}
          >
            Update
          </button>
          <FaceEnrollment studentId={_id} />
          <dialog id="update_student_modal" className="modal">
            <div className="modal-box">
              <UpdateStudentForm
                _id={_id}
                name={name}
                level={level}
                uid={uid}
              />
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => {
                    document
                      .getElementById("update_student_modal")
                      ?.classList.remove("modal-open");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

const UpdateStudentForm = ({ name, level }: IStudent) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IStudent>({ defaultValues: { name, level } });
  const updateStudent = (data: IStudent) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(updateStudent)}>
        <div className="mb-3">
          <input
            className="input input-bordered w-full"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-error">Name is required</span>}
        </div>
        <div className="mb-3">
          <input
            className="input input-bordered w-full"
            {...register("level", { required: true })}
          />
          {errors.level && (
            <span className="text-error">Level is required</span>
          )}
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
};
