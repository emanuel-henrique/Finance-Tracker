import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function TransactionFilter() {
  const [select, setSelect] = useState();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center container mx-auto px-4 pb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Procurar transações..."
          className="pl-10 bg-card border-border text-white"
        />
      </div>
      <Select
        value={select}
        onValueChange={(value) => {
          setSelect(value);
          console.log(value);
        }}
      >
        <SelectTrigger className="w-full sm:w-40 bg-card border-border text-white">
          <SelectValue placeholder="Filtrar" />
        </SelectTrigger>
        <SelectContent className="border-border">
          <SelectItem value="Todos">Todos</SelectItem>
          <SelectItem value="Receita">Receita</SelectItem>
          <SelectItem value="Depesas">Despesa</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
