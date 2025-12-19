import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import EditProfile from "./Pages/EditProfile";
import TransactionEdit from "./Pages/TransactionsEdit";
import "./global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<TransactionEdit />} />
        <Route path="/profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
