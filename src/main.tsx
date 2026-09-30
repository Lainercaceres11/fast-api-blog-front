import { StrictMode, ViewTransition } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes/router.tsx";
import { UserProvider } from "./context/user-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <ViewTransition>
        <Router />
      </ViewTransition>
    </UserProvider>
  </StrictMode>,
);
