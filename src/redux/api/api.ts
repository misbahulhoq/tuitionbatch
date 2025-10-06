import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

// export const baseURL =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:5000"
//     : "https://api-tuitionbatch.vercel.app";

export const baseURL = "https://api-tuitionbatch.vercel.app";
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  tagTypes: ["Students", "Attendance"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const authToken = localStorage.getItem("authToken");
      const email = session?.user?.email;
      if (authToken) headers.set("authToken", authToken);
      if (email) {
        console.log(email, Boolean(email));
        headers.set("email", email);
      }
      console.log(headers);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
