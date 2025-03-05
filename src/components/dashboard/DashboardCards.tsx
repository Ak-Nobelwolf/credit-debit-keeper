
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, DollarSign, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalization } from "@/contexts/LocalizationContext";

interface DashboardCardsProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export const DashboardCards = ({ totalIncome, totalExpenses, balance }: DashboardCardsProps) => {
  const { formatCurrency } = useLocalization();
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0;
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
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
              {savingsRate.toFixed(1)}%
            </span>
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">Savings Rate</h3>
          <p className="text-2xl font-bold mt-1">
            {savingsRate.toFixed(1)}%
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
};
