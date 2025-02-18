
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TransactionCard } from "@/components/TransactionCard";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Transaction {
  id: number;
  type: "credit" | "debit";
  amount: number;
  description: string;
  category: string;
  date: string;
}

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "credit",
      amount: 5000,
      description: "Salary",
      category: "Salary",
      date: "2024-03-25",
    },
    {
      id: 2,
      type: "debit",
      amount: 50,
      description: "Dinner",
      category: "Food",
      date: "2024-03-24",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const addTransaction = (newTransaction: Omit<Transaction, "id" | "date">) => {
    setTransactions([
      {
        ...newTransaction,
        id: transactions.length + 1,
        date: new Date().toISOString().split("T")[0],
      },
      ...transactions,
    ]);
  };

  const balance = transactions.reduce(
    (acc, curr) => acc + (curr.type === "credit" ? curr.amount : -curr.amount),
    0
  );

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 bg-white">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">Total Balance</h2>
            <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
          </Card>
          <Card className="p-6 bg-white">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">This Month</h2>
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Income</p>
                <p className="text-xl font-semibold text-income">
                  +$
                  {transactions
                    .filter(
                      (t) =>
                        t.type === "credit" &&
                        new Date(t.date).getMonth() === new Date().getMonth()
                    )
                    .reduce((acc, curr) => acc + curr.amount, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expenses</p>
                <p className="text-xl font-semibold text-expense">
                  -$
                  {transactions
                    .filter(
                      (t) =>
                        t.type === "debit" &&
                        new Date(t.date).getMonth() === new Date().getMonth()
                    )
                    .reduce((acc, curr) => acc + curr.amount, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} {...transaction} />
          ))}
        </div>
      </div>

      <AddTransactionDialog onAddTransaction={addTransaction} />
    </div>
  );
};

export default Index;
