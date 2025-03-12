"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import WelcomePage from "@/components/WelcomePage";
import AttendanceSheet from "@/components/AttendanceSheet";

const HomePage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Set the teacher's email in localStorage
    const teachersEmail = session?.user?.email;
    if (!localStorage.getItem("email"))
      localStorage.setItem("email", teachersEmail || "");
  }, [session, status]);

  if (session === undefined) return null;
  if (session === null) return <WelcomePage />;
  return (
    <div className="container-center">
      <AttendanceSheet />
    </div>
  );
};

export default HomePage;
