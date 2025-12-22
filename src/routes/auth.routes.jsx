import { Routes, Route } from "react-router-dom";

import Register from "@/Pages/Register";
import Login from "@/Pages/Login";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
