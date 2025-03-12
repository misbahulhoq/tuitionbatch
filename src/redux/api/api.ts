import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://api-tuitionbatch.vercel.app/api";

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  tagTypes: ["Students", "Attendance"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const authToken = localStorage.getItem("authToken");
      const email = localStorage.getItem("email");
      if (authToken) headers.set("authToken", authToken);
      if (email) headers.set("email", email);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
