
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { DashboardCards } from "@/components/dashboard/DashboardCards";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { TransactionsList } from "@/components/dashboard/TransactionsList";

interface Transaction {
  id: number | string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  category: string;
  date: string;
}

const Dashboard = () => {
  const { session } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sortBy, setSortBy] = useState<"date" | "amount" | "category">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterType, setFilterType] = useState<"all" | "credit" | "debit">("all");

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!session?.user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', session.user.id)
          .order('date', { ascending: false });
        
        if (error) {
          toast.error("Failed to load transactions: " + error.message);
          return;
        }
        
        setTransactions(data || []);
      } catch (error: any) {
        toast.error("Error loading transactions: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [session]);

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  const addTransaction = async (newTransaction: {
    type: "credit" | "debit";
    amount: number;
    description: string;
    category: string;
  }) => {
    if (!session?.user) {
      toast.error("You must be logged in to add transactions.");
      return;
    }
    
    const transactionWithDate = {
      ...newTransaction,
      date: new Date().toISOString().split("T")[0],
      user_id: session.user.id
    };
    
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert(transactionWithDate)
        .select();
        
      if (error) {
        toast.error("Failed to add transaction: " + error.message);
        return;
      }
      
      setTransactions(prev => [data[0], ...prev]);
      toast.success("Transaction added successfully!");
    } catch (error: any) {
      toast.error("Error adding transaction: " + error.message);
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading your financial data...</p>
        </div>
      </div>
    );
  }

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
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            >
              Financial Dashboard
            </motion.h1>
            <AddTransactionDialog onAddTransaction={addTransaction} />
          </motion.div>

          <DashboardCards 
            totalIncome={totalIncome} 
            totalExpenses={totalExpenses} 
            balance={balance} 
          />

          <DashboardFilters 
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterType={filterType}
            setFilterType={setFilterType}
            categories={categories}
          />

          <TransactionsList transactions={filteredAndSortedTransactions} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
