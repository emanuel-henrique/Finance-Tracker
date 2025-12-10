import {
  Edit2,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  CircleEllipsis,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export function TransactionsList() {
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate("/edit");
  };

  const transactions = [
    {
      id: "1",
      title: "Salary",
      description: "Monthly salary payment",
      amount: 5000,
      type: "income",
      date: "2025-12-01",
      createdAt: "2025-12-01T09:00:00Z",
      updatedAt: "2025-12-01T09:00:00Z",
    },
    {
      id: "2",
      title: "Rent",
      description: "Monthly apartment rent",
      amount: 1500,
      type: "expense",
      date: "2025-12-02",
      createdAt: "2025-12-02T10:30:00Z",
      updatedAt: "2025-12-02T10:30:00Z",
    },
    {
      id: "3",
      title: "Freelance Project",
      description: "Website development for client",
      amount: 2000,
      type: "income",
      date: "2025-11-28",
      createdAt: "2025-11-28T14:15:00Z",
      updatedAt: "2025-11-29T08:00:00Z",
    },
    {
      id: "4",
      title: "Groceries",
      description: "Weekly grocery shopping",
      amount: 150,
      type: "expense",
      date: "2025-11-27",
      createdAt: "2025-11-27T18:45:00Z",
      updatedAt: "2025-11-27T18:45:00Z",
    },
    {
      id: "5",
      title: "Utilities",
      description: "Electricity and water bills",
      amount: 200,
      type: "expense",
      date: "2025-11-25",
      createdAt: "2025-11-25T11:00:00Z",
      updatedAt: "2025-11-26T09:30:00Z",
    },
    {
      id: "6",
      title: "Investment Returns",
      description: "Dividend from stocks",
      amount: 350,
      type: "income",
      date: "2025-11-20",
      createdAt: "2025-11-20T16:00:00Z",
      updatedAt: "2025-11-20T16:00:00Z",
    },
  ];

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

  return (
    <div className="container mx-auto px-4 space-y-3 pt-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="block">
          <Card className="bg-card border-border hover:bg-accent-opacity transition-colors cursor-pointer">
            <CardContent className="px-4 py-10">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    transaction.type === "income"
                      ? "bg-success-opacity"
                      : "bg-destructive-opacity"
                  }`}
                >
                  {transaction.type === "income" ? (
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
                        transaction.type === "income"
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
                      transaction.type === "income"
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
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
                    onClick={goToEdit}
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
                    transaction.type === "income"
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
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
