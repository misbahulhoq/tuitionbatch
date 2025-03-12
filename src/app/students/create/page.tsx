"use client";
import AddStudentForm from "@/components/shared/AddStudentForm";
import React from "react";

const AddStudentPage = () => {
  return (
    <section className="container-center flex justify-center">
      <div className="py-3">
        <h2 className="mb-3 text-xl font-bold">Add New Student</h2>
        <AddStudentForm />
      </div>
    </section>
  );
};

export default AddStudentPage;
