import { Header } from "@/components/Home/hHeader";
import { SumaryDashboard } from "@/components/Home/Dashboard/sumaryDashboard";
import { TransactionsCreate } from "@/components/Trasactions/TrasactionsCreate";
import { TransactionsList } from "@/components/Trasactions/TransactionsList";
import { TransactionFilter } from "@/components/Trasactions/TransactionsFilter";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { api } from "@/services/api";

function Home() {
  const [select, setSelect] = useState("");
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]); // NOVO: armazena todas as transações
  const [loading, setLoading] = useState(false);

  // Busca TODAS as transações para o balanço
  useEffect(() => {
    async function getAllTransactions() {
      try {
        const response = await api.get("/transactions");
        setAllTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar todas as transações:", error);
      }
    }

    getAllTransactions();
  }, []); // Só executa uma vez ao carregar

  // Busca transações filtradas para a lista
  useEffect(() => {
    async function getFilteredTransactions() {
      try {
        setLoading(true);
        const response = await api.get("/transactions", {
          params: {
            type: select && select !== "Todos" ? select : undefined,
            title: search ? search.toLowerCase() : undefined,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false);
      }
    }

    getFilteredTransactions();
  }, [search, select]);

  // Calcula o balanço com base em TODAS as transações
  const summary = allTransactions.reduce(
    (acc, t) => {
      if (t.type === "Receita") {
        acc.income += t.amount;
      } else {
        acc.expense += t.amount;
      }
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    { balance: 0, income: 0, expense: 0 }
  );

  return (
    <div className="min-h-screen max-w-screen bg-background space-y-4">
      <Header />
      <SumaryDashboard summary={summary} />
      <TransactionsCreate />
      <TransactionFilter
        select={select}
        setSelect={setSelect}
        search={search}
        setSearch={setSearch}
      />
      <Separator className="container mx-auto px-4" />
      <TransactionsList transactions={transactions} loading={loading} />
    </div>
  );
}

export default Home;
