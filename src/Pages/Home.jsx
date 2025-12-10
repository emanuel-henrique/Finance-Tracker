import { Header } from "@/components/Home/hHeader";
import { SumaryDashboard } from "@/components/Home/Dashboard/sumaryDashboard";
import { TransactionsCreate } from "@/components/Trasactions/TrasactionsCreate";
import { TransactionsList } from "@/components/Trasactions/TransactionsList";
import { TransactionFilter } from "@/components/Trasactions/TransactionsFilter";
import { Separator } from "@/components/ui/separator";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen max-w-screen bg-background space-y-4">
      <Header />
      <SumaryDashboard />
      <TransactionsCreate />
      <TransactionFilter />
      <Separator className="container mx-auto px-4" />
      <TransactionsList />
      {/* TRANSACTIONS LIST */}
    </div>
  );
}

export default Home;
