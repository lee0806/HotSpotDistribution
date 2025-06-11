import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router/Router";
import { SelectedRegionProvider } from "./hooks/useSelectedRegion"; // ✅ 추가
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <SelectedRegionProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </SelectedRegionProvider>
  </React.StrictMode>
);
