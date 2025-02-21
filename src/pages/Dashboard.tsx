
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, DollarSign, TrendingUp } from "lucide-react";

const Dashboard = () => {
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Balance", value: "$12,345", icon: DollarSign, trend: "+12%" },
            { title: "Monthly Income", value: "$4,567", icon: ArrowUp, trend: "+5%" },
            { title: "Monthly Expenses", value: "$2,345", icon: ArrowDown, trend: "-3%" },
            { title: "Investments", value: "$8,901", icon: TrendingUp, trend: "+8%" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                  <span className="text-sm text-green-500">{item.trend}</span>
                </div>
                <h3 className="font-medium text-muted-foreground">{item.title}</h3>
                <p className="text-2xl font-bold">{item.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
