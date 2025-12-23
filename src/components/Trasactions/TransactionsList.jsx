import { ArrowUpRight, ArrowDownRight, CircleEllipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export function TransactionsList({ transactions, loading }) {
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate("/details");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 text-center py-8">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center py-8">
        <p className="text-muted-foreground">Nenhuma transação encontrada</p>
      </div>
    );
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  return (
    <div className="container mx-auto px-4 pb-8 space-y-3 pt-4">
      {transactions &&
        transactions.map((transaction) => (
          <div key={transaction.id} className="block">
            <Card className="bg-card border-border hover:bg-accent-opacity transition-colors cursor-pointer">
              <CardContent className="px-4 py-10">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      transaction.type === "Receita"
                        ? "bg-success-opacity"
                        : "bg-destructive-opacity"
                    }`}
                  >
                    {transaction.type === "Receita" ? (
                      <ArrowUpRight className="h-5 w-5 text-success" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-destructive" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">
                        {transaction.title}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`shrink-0 ${
                          transaction.type === "Receita"
                            ? "bg-success-opacity text-success hover:bg-success-opacity"
                            : "bg-destructive-opacity text-destructive hover:bg-destructive-opacity"
                        }`}
                      >
                        {transaction.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-0.5">
                      {transaction.description}
                    </p>
                  </div>

                  <div className="text-right shrink-0 hidden sm:block">
                    <p
                      className={`font-semibold ${
                        transaction.type === "Receita"
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {transaction.type === "Receita" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(transaction.date)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground ml-2"
                      onClick={() => handleDetails(transaction.id)}
                    >
                      <CircleEllipsis className="!h-6 !w-6" />
                    </Button>
                  </div>
                </div>

                {/* Mobile amount and date */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border sm:hidden">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>
                  <p
                    className={`font-semibold ${
                      transaction.type === "Receita"
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {transaction.type === "Receita" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
    </div>
  );
}
