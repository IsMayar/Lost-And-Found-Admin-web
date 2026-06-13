import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./styles.css";
import { AdminStoreProvider } from "./app/AdminStore";
import { router } from "./routes/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AdminStoreProvider>
      <RouterProvider router={router} />
    </AdminStoreProvider>
  </React.StrictMode>,
);
