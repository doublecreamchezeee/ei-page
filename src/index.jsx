import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      let errMsg;
      if (err.response) errMsg = err.response.data.message;
      else if (err.request) errMsg = err.request.message;
      else errMsg = err.message;

      toast.error(errMsg, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
