import { Header } from "@/components/Home/hHeader";
import { SumaryDashboard } from "@/components/Home/Dashboard/sumaryDashboard";
import { TransactionsCreate } from "@/components/Trasactions/TrasactionsCreate";
import { TransactionsList } from "@/components/Trasactions/TransactionsList";
import { TransactionFilter } from "@/components/Trasactions/TransactionsFilter";
import { Separator } from "@/components/ui/separator";

function Home() {
  return (
    <div className="min-h-screen max-w-screen bg-background space-y-4">
      <Header />
      <SumaryDashboard />
      <TransactionsCreate />
      <TransactionFilter />
      <Separator className="container mx-auto px-4" />
      <TransactionsList />
    </div>
  );
}

export default Home;
