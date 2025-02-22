
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";
import { TransactionCard } from "@/components/TransactionCard";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "credit" as const,
      amount: 5000,
      description: "Salary",
      category: "Salary",
      date: "2024-03-25",
    },
    {
      id: 2,
      type: "debit" as const,
      amount: 50,
      description: "Dinner",
      category: "Food",
      date: "2024-03-24",
    },
  ]);

  const addTransaction = (newTransaction: {
    type: "credit" | "debit";
    amount: number;
    description: string;
    category: string;
  }) => {
    setTransactions([
      {
        ...newTransaction,
        id: transactions.length + 1,
        date: new Date().toISOString().split("T")[0],
      },
      ...transactions,
    ]);
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.h1 
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.h1>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
                <span className={cn(
                  "text-sm",
                  balance >= 0 ? "text-green-500" : "text-red-500"
                )}>{balance >= 0 ? "+" : "-"}${Math.abs(balance).toFixed(2)}</span>
              </div>
              <h3 className="font-medium text-muted-foreground">Total Balance</h3>
              <p className="text-2xl font-bold">${Math.abs(balance).toFixed(2)}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <ArrowUp className="h-8 w-8 text-primary" />
                <span className="text-sm text-green-500">+${totalIncome.toFixed(2)}</span>
              </div>
              <h3 className="font-medium text-muted-foreground">Monthly Income</h3>
              <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <ArrowDown className="h-8 w-8 text-primary" />
                <span className="text-sm text-red-500">-${totalExpenses.toFixed(2)}</span>
              </div>
              <h3 className="font-medium text-muted-foreground">Monthly Expenses</h3>
              <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <span className="text-sm text-green-500">+8%</span>
              </div>
              <h3 className="font-medium text-muted-foreground">Savings Rate</h3>
              <p className="text-2xl font-bold">{((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)}%</p>
            </Card>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} {...transaction} />
            ))}
          </div>
        </div>

        {/* Add Transaction Button */}
        <AddTransactionDialog onAddTransaction={addTransaction} />
      </div>
    </div>
  );
};

export default Dashboard;
