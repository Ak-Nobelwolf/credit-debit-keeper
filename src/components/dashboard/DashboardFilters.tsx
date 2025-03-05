
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardFiltersProps {
  sortBy: "date" | "amount" | "category";
  setSortBy: (value: "date" | "amount" | "category") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  filterType: "all" | "credit" | "debit";
  setFilterType: (value: "all" | "credit" | "debit") => void;
  categories: string[];
}

export const DashboardFilters = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  filterCategory,
  setFilterCategory,
  filterType,
  setFilterType,
  categories
}: DashboardFiltersProps) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 rounded-lg p-4 sm:p-6"
    >
      <h2 className="text-lg font-semibold mb-4 sm:mb-6">Filters & Sorting</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
            <ArrowUpDown className="h-4 w-4 ml-2" />
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
  );
};
