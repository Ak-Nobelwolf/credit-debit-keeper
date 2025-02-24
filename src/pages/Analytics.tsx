
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLocalization } from "@/contexts/LocalizationContext";

interface Transaction {
  id: number;
  type: "credit" | "debit";
  amount: number;
  description: string;
  category: string;
  date: string;
}

const Analytics = () => {
  const { formatCurrency } = useLocalization();
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

  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  // Process data for charts
  const processData = () => {
    const currentDate = new Date();
    let startDate = new Date();

    switch (timeRange) {
      case "week":
        startDate.setDate(currentDate.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(currentDate.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(currentDate.getFullYear() - 1);
        break;
    }

    const filteredTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && 
             (selectedCategory === "all" || t.category === selectedCategory);
    });

    const aggregatedData = filteredTransactions.reduce((acc, t) => {
      const date = new Date(t.date);
      const key = date.toLocaleDateString('en-US', { 
        month: 'short',
        day: timeRange === "week" ? 'numeric' : undefined,
        year: timeRange === "year" ? 'numeric' : undefined
      });

      if (!acc[key]) {
        acc[key] = { month: key, income: 0, expenses: 0 };
      }

      if (t.type === "credit") {
        acc[key].income += t.amount;
      } else {
        acc[key].expenses += t.amount;
      }

      return acc;
    }, {} as Record<string, { month: string; income: number; expenses: number }>);

    return Object.values(aggregatedData);
  };

  const chartData = processData();

  // Calculate summary statistics
  const totalIncome = chartData.reduce((sum, d) => sum + d.income, 0);
  const totalExpenses = chartData.reduce((sum, d) => sum + d.expenses, 0);
  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-3 bg-background border">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-green-500">Income: {formatCurrency(payload[0].value)}</p>
          <p className="text-sm text-red-500">Expenses: {formatCurrency(payload[1].value)}</p>
        </Card>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <div className="flex gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeRange">Time Range</Label>
              <Select value={timeRange} onValueChange={(value: "week" | "month" | "year") => setTimeRange(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select category" />
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
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Income</h3>
            <p className="text-2xl font-bold text-green-500">{formatCurrency(totalIncome)}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-500">{formatCurrency(totalExpenses)}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Net Savings</h3>
            <p className={`text-2xl font-bold ${netSavings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatCurrency(netSavings)}
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Savings Rate</h3>
            <p className="text-2xl font-bold text-blue-500">{savingsRate.toFixed(1)}%</p>
          </Card>
        </div>

        {/* Charts */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Income vs Expenses</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" fill="#22c55e" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
