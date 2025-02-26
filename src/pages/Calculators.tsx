
import { motion } from "framer-motion";
import { FinanceCalculator } from "@/components/calculators/FinanceCalculator";

const Calculators = () => {
  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-8">Financial Calculators</h1>
        <FinanceCalculator />
      </motion.div>
    </div>
  );
};

export default Calculators;
