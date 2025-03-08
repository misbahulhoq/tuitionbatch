"use client";
import Navbar from "@/components/layout/Navbar";
import store from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
const AllProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Navbar />
        <div>{children}</div>
      </Provider>
    </SessionProvider>
  );
};

export default AllProvider;
