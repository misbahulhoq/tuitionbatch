"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <div className="container-center flex h-[100dvh] flex-col items-center justify-center">
      <div className="w-full max-w-sm text-center">
        <div className="mb-10 flex justify-center">
          <div className="breadcrumbs text-center">
            <ul>
              <li>
                <Link href={`/`}>Home</Link>
              </li>
              <li>
                <Link href={`/login`}>Login</Link>
              </li>
            </ul>
          </div>
        </div>
        <h1 className="mt-6 mb-9 text-4xl font-bold">Login</h1>
        <button
          className="btn btn-block btn-lg"
          onClick={() => {
            signIn("google", { redirectTo: "/" });
          }}
        >
          <FcGoogle size={24} />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
