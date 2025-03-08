"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const StudentsPageWrapper = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  if (session === undefined && status === "loading") return null;
  if (session === null && status === "unauthenticated")
    return redirect("/login");
  return <div>{children}</div>;
};

export default StudentsPageWrapper;
