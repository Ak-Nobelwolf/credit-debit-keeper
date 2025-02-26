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
import { useLocalization } from "@/contexts/LocalizationContext";
import { FinanceCalculator } from "@/components/calculators/FinanceCalculator";

const Dashboard = () => {
  const { formatCurrency } = useLocalization();
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

  const totalIncome = transactions
    .filter(t => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-background via-background to-background/95"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background -z-10" />

      <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
        <motion.div className="space-y-6">
          <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Financial Dashboard
            </motion.h1>
            <AddTransactionDialog onAddTransaction={addTransaction} />
          </motion.div>

          <motion.div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <span className={cn(
                    "text-sm font-medium px-2.5 py-0.5 rounded-full",
                    balance >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {balance >= 0 ? "+" : "-"}{formatCurrency(Math.abs(balance))}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Balance</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(Math.abs(balance))}</p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <ArrowUp className="h-6 w-6 text-green-500" />
                  </div>
                  <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-500">
                    +{formatCurrency(totalIncome)}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Monthly Income</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalIncome)}</p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <ArrowDown className="h-6 w-6 text-red-500" />
                  </div>
                  <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500">
                    -{formatCurrency(totalExpenses)}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Monthly Expenses</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalExpenses)}</p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500">
                    {((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)}%
                  </span>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Savings Rate</h3>
                <p className="text-2xl font-bold mt-1">
                  {((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)}%
                </p>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-6">Filters & Sorting</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Sort By</Label>
                <Select value={sortBy} onValueChange={(value: "date" | "amount" | "category") => setSortBy(value)}>
                  <SelectTrigger className="w-full">
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
                <Label className="text-sm font-medium">Order</Label>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setSortOrder(current => current === "asc" ? "desc" : "asc")}
                >
                  {sortOrder === "asc" ? "Ascending" : "Descending"}
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Category</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full">
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
                <Label className="text-sm font-medium">Type</Label>
                <Select value={filterType} onValueChange={(value: "all" | "credit" | "debit") => setFilterType(value)}>
                  <SelectTrigger className="w-full">
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
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Financial Calculators</h2>
            <FinanceCalculator />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {filteredAndSortedTransactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No transactions found. Try adjusting your filters.
                </p>
              ) : (
                filteredAndSortedTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    variants={itemVariants}
                    layout
                  >
                    <TransactionCard {...transaction} />
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
