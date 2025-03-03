"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Universal <br />
          Tuition Batch Management System.
        </h1>
        <p className="text-lg mb-8">
          Easily manage your students, track attendance, and save important
          information.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href={`/login`} className="btn btn-primary">
            Get Started
          </Link>
          <button className="btn btn-outline btn-primary">Learn More</button>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
