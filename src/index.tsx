import React from "react";
import { createRoot } from "react-dom/client";
import App from "~/components/App/App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { theme } from "~/theme";
import axios from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: Infinity },
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response.status;
    if (statusCode === 401) {
      alert("HTTP 401 Unauthorized. Authorization error. Provide credentials.");
    }
    if (statusCode === 403) {
      alert("HTTP 403 Forbidden. Authorization error. Incorrect credentials.");
    }
    if (statusCode === 400) {
      alert(error.response.data?.data);
    }
    return Promise.reject(error.response);
  }
);

// if (import.meta.env.DEV) {
//   const { worker } = await import("./mocks/browser");
//   worker.start({ onUnhandledRequest: "bypass" });
// }

const container = document.getElementById("app");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
