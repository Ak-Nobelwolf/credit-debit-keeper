import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { TransactionCard } from "@/components/TransactionCard";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

  const [sortBy, setSortBy] = useState<"date" | "amount" | "category">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterType, setFilterType] = useState<"all" | "credit" | "debit">("all");

  const categories = Array.from(new Set(transactions.map(t => t.category)));

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

  // Filter and sort transactions
  const filteredAndSortedTransactions = [...transactions]
    .filter(t => {
      if (filterCategory !== "all" && t.category !== filterCategory) return false;
      if (filterType !== "all" && t.type !== filterType) return false;
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
          break;
        case "amount":
          comparison = b.amount - a.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
      }
      return sortOrder === "asc" ? -comparison : comparison;
    });

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

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={sortBy} onValueChange={(value: "date" | "amount" | "category") => setSortBy(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Order</Label>
            <Button
              variant="outline"
              className="w-[150px]"
              onClick={() => setSortOrder(current => current === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? "Ascending" : "Descending"}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={filterType} onValueChange={(value: "all" | "credit" | "debit") => setFilterType(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Income</SelectItem>
                <SelectItem value="debit">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {filteredAndSortedTransactions.map((transaction) => (
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
