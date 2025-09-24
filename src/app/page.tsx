"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import WelcomePage from "@/components/WelcomePage";
import AttendanceSheet from "@/components/AttendanceSheet";

const HomePage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const teachersEmail = session?.user?.email;
    localStorage.setItem("email", teachersEmail as string);
    async function biometricCheck() {
      const capabilities = await PublicKeyCredential.getClientCapabilities();
      console.log(capabilities);
    }
    biometricCheck();
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
