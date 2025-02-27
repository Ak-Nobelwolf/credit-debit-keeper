
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateLoan = () => {
    // Convert annual interest rate to monthly rate
    const monthlyRate = interestRate / 100 / 12;
    // Convert loan term from years to months
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly payment using the loan formula
    const x = Math.pow(1 + monthlyRate, numberOfPayments);
    const monthly = (loanAmount * x * monthlyRate) / (x - 1);
    
    setMonthlyPayment(monthly);
    setTotalPayment(monthly * numberOfPayments);
    setTotalInterest((monthly * numberOfPayments) - loanAmount);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Loan Calculator</h2>
      <p className="text-muted-foreground">
        Calculate your monthly payment, total payment, and total interest for a loan.
      </p>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="loanAmount">Loan Amount: ${loanAmount.toLocaleString()}</Label>
          <Slider 
            id="loanAmount"
            min={1000} 
            max={100000} 
            step={1000} 
            value={[loanAmount]} 
            onValueChange={(value) => setLoanAmount(value[0])} 
            className="mt-2"
          />
          <Input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="interestRate">Interest Rate: {interestRate}%</Label>
          <Slider 
            id="interestRate"
            min={0.1} 
            max={20} 
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
          <Label htmlFor="loanTerm">Loan Term: {loanTerm} years</Label>
          <Slider 
            id="loanTerm"
            min={1} 
            max={30} 
            step={1} 
            value={[loanTerm]} 
            onValueChange={(value) => setLoanTerm(value[0])} 
            className="mt-2"
          />
          <Input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="mt-2"
          />
        </div>
        
        <Button onClick={calculateLoan} className="w-full">Calculate</Button>
      </div>
      
      {monthlyPayment !== null && (
        <Card className="p-4 bg-primary/5 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Monthly Payment:</span>
            <span className="font-bold">${monthlyPayment.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Payment:</span>
            <span className="font-bold">${totalPayment?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Interest:</span>
            <span className="font-bold">${totalInterest?.toFixed(2)}</span>
          </div>
        </Card>
      )}
    </div>
  );
};
