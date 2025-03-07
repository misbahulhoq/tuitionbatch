"use client";
import Navbar from "@/components/layout/Navbar";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Navbar />
      <div>{children}</div>
    </SessionProvider>
  );
};

export default Provider;
