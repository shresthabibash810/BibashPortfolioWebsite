// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";

// Import App and styles
import App from "./App.jsx";
import "./index.css";

// Import AOS CSS globally (critical for scroll animations)
import "aos/dist/aos.css";

// Optional: Add loading state to prevent flash of unstyled content
if (document.readyState === "loading") {
  document.documentElement.classList.add("js-loading");
} else {
  document.documentElement.classList.remove("js-loading");
}

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.remove("js-loading");
});

// Render React App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);