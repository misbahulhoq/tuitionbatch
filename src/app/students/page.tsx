"use client";
import Spinner from "@/components/loaders/Spinner";
import AddStudentForm from "@/components/shared/AddStudentForm";
import { useGetStudentsQuery } from "@/redux/features/studets/studentsApiSlice";
import React from "react";

const StudentsPage = () => {
  const { data, isLoading } = useGetStudentsQuery();
  console.log(data);
  if (isLoading) return <Spinner />;
  return (
    <div className="container-center mt-3">
      <div className="mb-5 flex justify-end">
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
}
const StudentCard = ({ props }: { props: IStudent }) => {
  const { _id, name, level } = props || {};
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Class: {level}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-error btn-outline">Delete</button>
          <button className="btn btn-primary">Update</button>
        </div>
      </div>
    </div>
  );
};
