"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const WelcomePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="container-center text-center"
      >
        <h1 className="mb-4 text-4xl leading-[1.5] font-bold lg:text-5xl">
          Welcome to Universal <br />
          Tuition Batch Management System.
        </h1>
        <p className="mb-8 text-lg">
          Easily manage your students, track attendance, and save important
          information.
        </p>
        <div className="flex justify-center gap-7">
          <Link href={`/login`} className="btn btn-primary btn-lg">
            Get Started
          </Link>
          <Link href={`/docs`} className="btn btn-outline btn-primary btn-lg">
            Learn More
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
