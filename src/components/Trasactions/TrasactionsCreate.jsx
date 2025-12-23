import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TransactionsCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Receita");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleCreateTransaction(e) {
    e.preventDefault();

    // Previne múltiplos cliques
    if (isLoading) return;

    setIsLoading(true);

    try {
      const transaction = {
        title,
        description: description.trim() || "Transação sem descrição.",
        type,
        amount,
        date,
      };

      const response = await api.post("/transactions/create", transaction);
      console.log(response.data);

      // Recarrega após sucesso
      window.location.reload();
    } catch (error) {
      setIsLoading(false); // Libera o botão em caso de erro

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível criar a transação");
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold text-foreground">Transações</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-opacity-90">
            <Plus className="h-4 w-4" />
            Criar Transação
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md border-border text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">
              Nova Transação
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-5 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-white">
                Título <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Monthly Salary"
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-white"
              >
                Descrição
              </Label>
              <Textarea
                id="description"
                placeholder="Add details about this transaction..."
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                disabled={isLoading}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">
                Tipo <span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setType("Receita")}
                  disabled={isLoading}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all",
                    type === "Receita"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                      : "border-muted bg-muted/50 text-muted-foreground hover:border-muted-foreground/30",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  Receita
                </button>
                <button
                  type="button"
                  onClick={() => setType("Despesa")}
                  disabled={isLoading}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all",
                    type === "Despesa"
                      ? "border-red-500 bg-red-500/10 text-red-500"
                      : "border-muted bg-muted/50 text-muted-foreground hover:border-muted-foreground/30",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  Despesa
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="amount"
                className="text-sm font-medium text-white"
              >
                Valor <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  disabled={isLoading}
                  className="h-11 pl-7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">
                Data <span className="text-destructive">*</span>
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isLoading}
                    className={cn(
                      "w-full h-11 justify-start text-left font-normal ",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4 stroke-muted-foreground" />
                    {date
                      ? format(date, "PPP", { locale: ptBR })
                      : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 border-border"
                  align="start"
                >
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      setOpen(false);
                    }}
                    locale={ptBR}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-[100%] flex flex-col gap-3 pt-4 border-t border-border">
              <div className="w-[100%] flex justify-end gap-3">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="px-6 text-white"
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleCreateTransaction}
                  disabled={isLoading}
                  className="px-6 bg-emerald-700 hover:bg-emerald-800 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Criando..." : "Criar"}
                </Button>
              </div>
            </div>
          </form>

          <DialogDescription className="sr-only">
            Formulário para criar uma nova transação
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
