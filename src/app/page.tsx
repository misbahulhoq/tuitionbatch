"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import WelcomePage from "@/components/WelcomePage";

const HomePage = () => {
  const { data: session } = useSession();
  console.log(session);
  if (session === undefined) return null;
  if (session === null) return <WelcomePage />;
  return <div className="container-center">you are signed in.</div>;
};

export default HomePage;
