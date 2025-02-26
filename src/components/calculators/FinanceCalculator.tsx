
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useLocalization } from "@/contexts/LocalizationContext";

type CalculatorType = "loan" | "savings" | "investment";

export const FinanceCalculator = () => {
  const { formatCurrency } = useLocalization();
  const [calculatorType, setCalculatorType] = useState<CalculatorType>("loan");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const interestRate = parseFloat(rate) / 100;
    const timeYears = parseFloat(time);

    if (isNaN(principal) || isNaN(interestRate) || isNaN(timeYears)) {
      toast.error("Please enter valid numbers");
      return;
    }

    let calculatedResult = 0;

    switch (calculatorType) {
      case "loan":
        // Monthly payment calculation (PMT)
        const monthlyRate = interestRate / 12;
        const numberOfPayments = timeYears * 12;
        calculatedResult = 
          (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        break;

      case "savings":
        // Future value of savings with monthly deposits
        calculatedResult = principal * Math.pow(1 + interestRate, timeYears);
        break;

      case "investment":
        // Compound interest calculation
        calculatedResult = 
          principal * Math.pow(1 + interestRate / 12, timeYears * 12);
        break;
    }

    setResult(calculatedResult);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Financial Calculator</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Calculator Type</Label>
          <Select
            value={calculatorType}
            onValueChange={(value: CalculatorType) => {
              setCalculatorType(value);
              setResult(null);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select calculator type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="loan">Loan Payment</SelectItem>
              <SelectItem value="savings">Savings Growth</SelectItem>
              <SelectItem value="investment">Investment Return</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>
            {calculatorType === "loan"
              ? "Loan Amount"
              : calculatorType === "savings"
              ? "Initial Savings"
              : "Investment Amount"}
          </Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="space-y-2">
          <Label>Annual Interest Rate (%)</Label>
          <Input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter interest rate"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label>Time (Years)</Label>
          <Input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time in years"
            step="0.5"
          />
        </div>

        <Button onClick={calculate} className="w-full">
          Calculate
        </Button>

        {result !== null && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {calculatorType === "loan"
                ? "Monthly Payment:"
                : calculatorType === "savings"
                ? "Future Value:"
                : "Investment Value:"}
            </p>
            <p className="text-2xl font-bold">{formatCurrency(result)}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
