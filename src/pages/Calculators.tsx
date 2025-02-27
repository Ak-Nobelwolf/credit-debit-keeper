
import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanCalculator } from "@/components/calculators/LoanCalculator";
import { SavingsCalculator } from "@/components/calculators/SavingsCalculator";
import { CurrencyConverter } from "@/components/calculators/CurrencyConverter";

const Calculators = () => {
  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-8">Financial Calculators</h1>
        
        <Tabs defaultValue="loan" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="loan">Loan Calculator</TabsTrigger>
            <TabsTrigger value="savings">Savings Calculator</TabsTrigger>
            <TabsTrigger value="currency">Currency Converter</TabsTrigger>
          </TabsList>
          
          <TabsContent value="loan">
            <Card className="p-6">
              <LoanCalculator />
            </Card>
          </TabsContent>
          
          <TabsContent value="savings">
            <Card className="p-6">
              <SavingsCalculator />
            </Card>
          </TabsContent>
          
          <TabsContent value="currency">
            <Card className="p-6">
              <CurrencyConverter />
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Calculators;
