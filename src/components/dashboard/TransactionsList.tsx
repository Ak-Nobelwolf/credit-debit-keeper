
import { motion } from "framer-motion";
import { TransactionCard } from "@/components/TransactionCard";

interface Transaction {
  id: number | string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

export const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 rounded-lg p-4 sm:p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No transactions found. Try adjusting your filters.
          </p>
        ) : (
          transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              layout
            >
              <TransactionCard {...transaction} />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};
