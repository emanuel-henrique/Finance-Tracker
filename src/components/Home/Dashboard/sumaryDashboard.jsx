import { CardSumary } from "@/components/Home/Dashboard/cardSumary";

export function SumaryDashboard({ summary }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };
  return (
    <div className="container mx-auto px-4 py-4 grid gap-4 md:grid-cols-3 ">
      <CardSumary
        title="Balanço Total"
        type="balance"
        value={formatCurrency(summary.balance)}
      />
      <CardSumary
        title="Receita Total"
        type="income"
        value={formatCurrency(summary.income)}
      />
      <CardSumary
        title="Despesa Total"
        type="expense"
        value={formatCurrency(summary.expense)}
      />
    </div>
  );
}
