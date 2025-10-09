"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { PiSignOut } from "react-icons/pi";
import SidebarLink from "../SidebarLink";
const sidebarLinks = [
  { href: "/", title: "Home" },
  { href: "/face-detector", title: "Face Detector" },
  { href: "/history", title: "History" },
  { href: "/students", title: "Students" },
  { href: "/students/create", title: "Add Student" },
  { href: "/docs", title: "Learn More" },
];

const Navbar = () => {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  if (!session) return null;
  return (
    <header className="bg-base-200 flex h-14 items-center">
      <nav className="container-center flex items-center justify-between">
        <label className="btn btn-circle swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            checked={sidebarOpen}
            onChange={toggleSidebar}
          />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="m-1 cursor-pointer select-none"
          >
            <Image
              src={session.user?.image || ""}
              alt={session.user?.name || ""}
              height={30}
              width={30}
              className="h-9 w-9 cursor-pointer rounded-full"
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-300 rounded-box z-1 w-56 p-2 shadow-sm"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              {/* <span className="lg:text-md text-xs">{session?.user?.email}</span> */}
              <Image
                src={session.user?.image || ""}
                alt={session.user?.name || ""}
                height={100}
                width={100}
                className="mx-auto h-24 w-24 rounded-full select-none"
              />
              <p className="">Hi, {session?.user?.name}</p>
            </div>

            <li className="mt-3">
              <a
                onClick={() => {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("email");
                  signOut();
                }}
                className="btn"
              >
                <PiSignOut />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="relative">
        {/* Sidebar */}
        <div
          className={`bg-base-300 fixed top-14 left-0 z-50 h-full w-64 transform transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="">
            <ul className="menu mt-4 w-full space-y-1.5">
              {sidebarLinks.map((link) => (
                <li key={link.href} onClick={closeSidebar} className="text-lg">
                  <SidebarLink href={link.href} title={link.title} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
