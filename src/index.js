import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast"; // ✅ import Toaster
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      {/* Toaster will handle all toast notifications */}
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            fontWeight: "bold",
          },
          duration: 3000,
        }}
      />
    </BrowserRouter>
  </Provider>
);
