import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CardSumary({ title, type, value }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p
              className={`text-2xl font-bold mt-1 ${
                type === "balance"
                  ? "text-foreground"
                  : type === "income"
                  ? "text-success"
                  : type === "expense"
                  ? "text-destructive"
                  : "text-foreground"
              }`}
            >
              {value}
            </p>
          </div>

          {(() => {
            switch (type) {
              case "balance":
                return (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                    <Wallet className="h-6 w-6 text-foreground" />
                  </div>
                );
              case "income":
                return (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-opacity">
                    <ArrowUpRight className="h-6 w-6 text-success" />
                  </div>
                );
              case "expense":
                return (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive-opacity">
                    <ArrowDownRight className="h-6 w-6 text-destructive" />
                  </div>
                );
              default:
                return null;
            }
          })()}
        </div>
      </CardContent>
    </Card>
  );
}
