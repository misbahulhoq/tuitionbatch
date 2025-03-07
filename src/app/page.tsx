"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import WelcomePage from "@/components/WelcomePage";

const HomePage = () => {
  const { data: session } = useSession();
  if (!session) return <WelcomePage />;
  return <div></div>;
};

export default HomePage;
