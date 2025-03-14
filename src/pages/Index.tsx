
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TransactionCard } from "@/components/TransactionCard";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { Input } from "@/components/ui/input";
import { Search, Calendar, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  ResponsiveContainer,
  PieChart as PieChartComponent,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

interface Transaction {
  id: number;
  type: "credit" | "debit";
  amount: number;
  description: string;
  category: string;
  date: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showChart, setShowChart] = useState(false);

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

  const categories = [...new Set(transactions.map((t) => t.category))];
  
  const categoryTotals = categories.reduce((acc, category) => {
    const total = transactions
      .filter((t) => t.category === category)
      .reduce((sum, t) => sum + (t.type === "debit" ? t.amount : 0), 0);
    return { ...acc, [category]: total };
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const filteredTransactions = transactions
    .filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((transaction) => 
      selectedCategory === "all" || transaction.category === selectedCategory
    )
    .filter((transaction) => {
      if (!startDate || !endDate) return true;
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc" 
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return sortOrder === "desc" 
          ? b.amount - a.amount
          : a.amount - b.amount;
      }
    });

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-6 pt-14 lg:pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">Total Balance</h2>
            <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">This Month</h2>
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Income</p>
                <p className="text-xl font-semibold text-income">
                  +${transactions
                    .filter(t => t.type === "credit" &&
                      new Date(t.date).getMonth() === new Date().getMonth()
                    )
                    .reduce((acc, curr) => acc + curr.amount, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expenses</p>
                <p className="text-xl font-semibold text-expense">
                  -${transactions
                    .filter(t => t.type === "debit" &&
                      new Date(t.date).getMonth() === new Date().getMonth()
                    )
                    .reduce((acc, curr) => acc + curr.amount, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={startDate}
                selected={{
                  from: startDate,
                  to: endDate,
                }}
                onSelect={(range) => {
                  setStartDate(range?.from);
                  setEndDate(range?.to);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select 
            value={`${sortBy}-${sortOrder}`} 
            onValueChange={(value) => {
              const [by, order] = value.split("-") as ["date" | "amount", "asc" | "desc"];
              setSortBy(by);
              setSortOrder(order);
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="amount-desc">Highest Amount</SelectItem>
              <SelectItem value="amount-asc">Lowest Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Spending by Category</h3>
            {showChart && (
              <Button variant="outline" size="sm" onClick={() => setShowChart(false)}>
                Show List View
              </Button>
            )}
          </div>
          
          {showChart ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChartComponent>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number | string) => {
                      if (typeof value === 'number') {
                        return `$${value.toFixed(2)}`;
                      }
                      return value;
                    }}
                  />
                </PieChartComponent>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="space-y-2">
              {Object.entries(categoryTotals)
                .sort(([, a], [, b]) => b - a)
                .map(([category, amount]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{category}</span>
                    <span className="font-medium">${amount.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          )}
        </Card>

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
