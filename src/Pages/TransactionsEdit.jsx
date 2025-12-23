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
import { useNavigate, useParams } from "react-router-dom";

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
import { useEffect, useState } from "react";
import { api } from "@/services/api";

function TransactionEdit() {
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
    navigate(-1);
  };

  const [data, setData] = useState("");
  const params = useParams();

  useEffect(() => {
    async function getTransaction() {
      const response = await api.get(`/transactions/${params.id}`);
      setData(response.data);
    }
    getTransaction();
  }, []);

  async function handleDeleteTransaction() {
    await api.delete(`/transactions/${params.id}`);
    goToHome();
  }

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
                    Tem certeza de que deseja excluir "{data.title}"? Esta ação
                    não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-border bg-secondary text-foreground hover:bg-secondary/80">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteTransaction}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive-hover"
                  >
                    Deletar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {data && (
          <main>
            <Card className="bg-card border-border mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
                      data.type === "Receita"
                        ? "bg-success-opacity"
                        : "bg-destructive-opacity"
                    }`}
                  >
                    {data.type === "Receita" ? (
                      <ArrowUpRight className="h-7 w-7 text-success" />
                    ) : (
                      <ArrowDownRight className="h-7 w-7 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-foreground">
                        {data.title}
                      </h1>
                      <Badge
                        className={`${
                          data.type === "Receita"
                            ? "bg-success-opacity text-success hover:bg-success/20"
                            : "bg-destructive-opacity text-destructive hover:bg-destructive/20"
                        }`}
                      >
                        {data.type === "Receita" ? "Receita" : "Expense"}
                      </Badge>
                    </div>
                    {data.description && (
                      <p className="text-muted-foreground">
                        {data.description}
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
                    data.type === "Receita"
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {data.type === "Receita" ? "+" : "-"}
                  {formatCurrency(data.amount)}
                </p>
              </CardContent>
            </Card>

            {/* Details Card */}
            <Card className="bg-card border-border mb-6">
              <CardContent className="p-6 space-y-6">
                {/* data Date */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      data Date
                    </p>
                    <p className="text-foreground font-medium">
                      {formatDate(data.date)}
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
                      {formatDateTime(data.createdAt)}
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
                      {formatDateTime(data.updatedAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        )}
      </div>
    </div>
  );
}

export default TransactionEdit;
