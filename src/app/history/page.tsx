"use client";

import React from "react";
import AttendanceHistory from "@/components/AttendanceHistory";
const mockData = [
  {
    date: "2025-04-01",
    students: [
      {
        id: 1,
        name: "Ayesha Khatun",
        email: "ayesha@example.com",
        status: "present",
      },
      {
        id: 2,
        name: "Rafi Hossain",
        email: "rafi@example.com",
        status: "absent",
      },
    ],
  },
  {
    date: "2025-04-02",
    students: [
      {
        id: 1,
        name: "Ayesha Khatun",
        email: "ayesha@example.com",
        status: "absent",
      },
      {
        id: 2,
        name: "Rafi Hossain",
        email: "rafi@example.com",
        status: "present",
      },
    ],
  },
  {
    date: "2025-03-30",
    students: [
      {
        id: 1,
        name: "Ayesha Khatun",
        email: "ayesha@example.com",
        status: "present",
      },
    ],
  },
];

export default function App() {
  return (
    <div className="mx-auto mt-5 max-w-5xl">
      {/* //@ts-ignore */}
      {/* <AttendanceHistory data={mockData} /> */}
    </div>
  );
}
