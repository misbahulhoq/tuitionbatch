"use client";
import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center w-full max-w-sm"
      >
        <h1 className="text-4xl font-bold mb-6">Login</h1>
        <button className="btn btn-block">
          <FcGoogle size={24} />
          Login with Google
        </button>
        <span className="divider divide-primary">or</span>
        <Link href={`/signup`} className="text-secondary">
          Continue with Email
        </Link>
      </motion.div>
    </div>
  );
};

export default LoginPage;
