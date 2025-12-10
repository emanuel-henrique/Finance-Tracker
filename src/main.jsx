import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./global.css";
import { TransactionEdit } from "./components/Trasactions/TransactionsEdit";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<TransactionEdit />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
