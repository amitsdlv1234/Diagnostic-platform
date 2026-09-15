import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./store/authStore";
import { CartProvider } from "./features/cart/cartStore";
import { ThemeProvider } from "./components/theme/ThemeProvider";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>
    <ThemeProvider>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
