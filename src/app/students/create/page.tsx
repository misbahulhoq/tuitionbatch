"use client";

import AddStudentForm from "@/components/shared/AddStudentForm";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

const AddStudentPage = () => {
  const { data: session } = useSession();

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
