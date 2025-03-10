"use client";
import Spinner from "@/components/loaders/Spinner";
import { useGetStudentsQuery } from "@/redux/features/studets/studentsApiSlice";
import React from "react";

const StudentsPage = () => {
  const { data, isLoading } = useGetStudentsQuery();
  console.log(data);
  if (isLoading) return <Spinner />;
  return (
    <div className="container-center mt-3">
      <div className="mb-5 flex justify-end">
        <button className="btn btn-primary btn-sm">Add New</button>
      </div>
      <div>
        {Array.isArray(data) &&
          data.map((student) => {
            return <StudentCard key={student._id} />;
          })}
      </div>
    </div>
  );
};

export default StudentsPage;

const StudentCard = () => {
  return <div>StudentCard</div>;
};
