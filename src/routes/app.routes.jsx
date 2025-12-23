import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import EditProfile from "../Pages/EditProfile";
import TransactionEdit from "../Pages/TransactionsEdit";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<TransactionEdit />} />
      <Route path="/profile" element={<EditProfile />} />
    </Routes>
  );
}
