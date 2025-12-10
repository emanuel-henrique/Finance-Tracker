import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";

export function TransactionsCreate() {
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
                required
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
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">
                Tipo <span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-3 ">
                <button
                  type="button"
                  className="flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all border-emerald-500 bg-emerald-500/10 text-emerald-500"
                >
                  Receita
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all border-muted bg-muted/50 text-muted-foreground hover:border-muted-foreground/30"
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
                  placeholder="0.00"
                  required
                  className="h-11 pl-7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-white">
                Data <span className="text-destructive">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                required
                className="h-11 text-white w-full"
              />
            </div>

            <DialogClose className="w-[100%] flex flex-col gap-3 pt-4 border-t border-border">
              <div className="w-[100%] flex justify-end gap-3">
                <Button variant="outline" className="px-6 text-white">
                  Cancelar
                </Button>
                <Button className="px-6 bg-emerald-700 hover:bg-emerald-800 text-primary-foreground">
                  Criar
                </Button>
              </div>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
