
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "./ui/card";

interface TransactionCardProps {
  type: "credit" | "debit";
  amount: number;
  description: string;
  category: string;
  date: string;
}

export function TransactionCard({ type, amount, description, category, date }: TransactionCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              type === "credit" ? "bg-green-100" : "bg-red-100"
            )}
          >
            {type === "credit" ? (
              <ArrowUpRight className="text-income w-5 h-5" />
            ) : (
              <ArrowDownRight className="text-expense w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-sm">{description}</h3>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
        </div>
        <div className="text-right">
          <p
            className={cn(
              "font-semibold",
              type === "credit" ? "text-income" : "text-expense"
            )}
          >
            {type === "credit" ? "+" : "-"}${amount.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>
    </Card>
  );
}
