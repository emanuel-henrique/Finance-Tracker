import {
  ArrowLeft,
  Edit2,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function TransactionEdit() {
  const transaction = {
    id: "1",
    title: "Salary",
    description: "Monthly salary payment",
    amount: 5000,
    type: "income",
    date: "2025-12-01",
    createdAt: "2025-12-01T09:00:00Z",
    updatedAt: "2025-12-01T09:00:00Z",
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background max-w-screen ">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={goToHome}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-border bg-transparent text-white"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-destructive/50 text-destructive hover:bg-destructive-opacity hover:text-destructive bg-transparent"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Deletar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-card border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-foreground">
                    Deletar Transação
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    Tem certeza de que deseja excluir "{transaction.title}"?
                    Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-border bg-secondary text-foreground hover:bg-secondary/80">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Deletar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Transaction Title Card */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
                  transaction.type === "income"
                    ? "bg-success-opacity"
                    : "bg-destructive-opacity"
                }`}
              >
                {transaction.type === "income" ? (
                  <ArrowUpRight className="h-7 w-7 text-success" />
                ) : (
                  <ArrowDownRight className="h-7 w-7 text-destructive" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    {transaction.title}
                  </h1>
                  <Badge
                    className={`${
                      transaction.type === "income"
                        ? "bg-success-opacity text-success hover:bg-success/20"
                        : "bg-destructive-opacity text-destructive hover:bg-destructive/20"
                    }`}
                  >
                    {transaction.type === "income" ? "Income" : "Expense"}
                  </Badge>
                </div>
                {transaction.description && (
                  <p className="text-muted-foreground">
                    {transaction.description}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amount Card */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Amount
            </p>
            <p
              className={`text-4xl font-bold ${
                transaction.type === "income"
                  ? "text-success"
                  : "text-destructive"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-6 space-y-6">
            {/* Transaction Date */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Transaction Date
                </p>
                <p className="text-foreground font-medium">
                  {formatDate(transaction.date)}
                </p>
              </div>
            </div>

            <div className="border-t border-border" />

            {/* Created At */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Created
                </p>
                <p className="text-foreground">
                  {formatDateTime(transaction.createdAt)}
                </p>
              </div>
            </div>

            <div className="border-t border-border" />

            {/* Updated At */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </p>
                <p className="text-foreground">
                  {formatDateTime(transaction.updatedAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TransactionEdit;
