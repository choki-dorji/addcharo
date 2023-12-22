import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BpData, Bmidata, BMIData, bloodData } from "@/types;

const api = createApi({
  reducerPath: "Slice",
  baseQuery: fetchBaseQuery({ baseUrl:  process.env.NEXT_PUBLIC_NEXT_DOMAIN }),
  tagTypes: [
    'bp', 
    "weight",
    "fire",
    'alarm', 
    "prescription"
],
  endpoints: (builder) => ({ }),
});

export default api;