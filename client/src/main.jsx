import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { HideSidebarProvider } from "./context/HideSidebarContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TaskProvider>
          <DarkModeProvider>
            <HideSidebarProvider>
              <App />
            </HideSidebarProvider>
          </DarkModeProvider>
        </TaskProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
