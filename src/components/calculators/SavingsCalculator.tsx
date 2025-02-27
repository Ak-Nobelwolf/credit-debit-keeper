
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [interestRate, setInterestRate] = useState(5);
  const [years, setYears] = useState(10);
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [interestEarned, setInterestEarned] = useState<number | null>(null);

  const calculateSavings = () => {
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    // Number of months
    const numMonths = years * 12;
    
    // Calculate future value of regular deposits
    const futureValueOfDeposits = monthlyContribution * ((Math.pow(1 + monthlyRate, numMonths) - 1) / monthlyRate);
    
    // Calculate future value of initial deposit
    const futureValueOfInitial = initialDeposit * Math.pow(1 + monthlyRate, numMonths);
    
    // Total future value
    const totalFutureValue = futureValueOfDeposits + futureValueOfInitial;
    
    // Total contributions
    const totalContributed = initialDeposit + (monthlyContribution * numMonths);
    
    setFutureValue(totalFutureValue);
    setTotalContributions(totalContributed);
    setInterestEarned(totalFutureValue - totalContributed);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Savings Calculator</h2>
      <p className="text-muted-foreground">
        Calculate how your savings will grow over time with regular contributions.
      </p>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="initialDeposit">Initial Deposit: ${initialDeposit.toLocaleString()}</Label>
          <Slider 
            id="initialDeposit"
            min={0} 
            max={50000} 
            step={100} 
            value={[initialDeposit]} 
            onValueChange={(value) => setInitialDeposit(value[0])} 
            className="mt-2"
          />
          <Input
            type="number"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(Number(e.target.value))}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="monthlyContribution">Monthly Contribution: ${monthlyContribution}</Label>
          <Slider 
            id="monthlyContribution"
            min={0} 
            max={2000} 
            step={10} 
            value={[monthlyContribution]} 
            onValueChange={(value) => setMonthlyContribution(value[0])} 
            className="mt-2"
          />
          <Input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="interestRate">Annual Interest Rate: {interestRate}%</Label>
          <Slider 
            id="interestRate"
            min={0.1} 
            max={15} 
            step={0.1} 
            value={[interestRate]} 
            onValueChange={(value) => setInterestRate(value[0])} 
            className="mt-2"
          />
          <Input
            type="number"
            value={interestRate}
            step="0.1"
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="years">Time Period: {years} years</Label>
          <Slider 
            id="years"
            min={1} 
            max={40} 
            step={1} 
            value={[years]} 
            onValueChange={(value) => setYears(value[0])} 
            className="mt-2"
          />
          <Input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-2"
          />
        </div>
        
        <Button onClick={calculateSavings} className="w-full">Calculate</Button>
      </div>
      
      {futureValue !== null && (
        <Card className="p-4 bg-primary/5 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Future Value:</span>
            <span className="font-bold">${futureValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Contributions:</span>
            <span className="font-bold">${totalContributions?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Interest Earned:</span>
            <span className="font-bold">${interestEarned?.toFixed(2)}</span>
          </div>
        </Card>
      )}
    </div>
  );
};
