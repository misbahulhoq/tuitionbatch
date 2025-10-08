"use client";
import Navbar from "@/components/layout/Navbar";
import store from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
const AllProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Toaster />
        <Navbar />
        <div>{children}</div>
      </Provider>
    </SessionProvider>
  );
};

export default AllProvider;
