
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";

// Mock exchange rates - in a real app, these would come from an API
const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.22,
  CAD: 1.25,
  AUD: 1.35,
  CNY: 6.45,
  INR: 74.52,
  BRL: 5.25,
  ZAR: 14.75
};

type CurrencyCode = keyof typeof exchangeRates;

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("USD");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    // Reset converted amount when currencies change
    setConvertedAmount(null);
  }, [fromCurrency, toCurrency, amount]);

  const handleConvert = () => {
    // Get exchange rates for both currencies relative to USD
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    
    // Calculate the direct exchange rate
    const rate = toRate / fromRate;
    
    // Calculate the converted amount
    const result = amount * rate;
    
    setExchangeRate(rate);
    setConvertedAmount(result);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Currency Converter</h2>
      <p className="text-muted-foreground">
        Convert between different currencies using current exchange rates.
      </p>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-2"
          />
        </div>
        
        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
          <div>
            <Label htmlFor="fromCurrency">From</Label>
            <Select 
              value={fromCurrency} 
              onValueChange={(value) => setFromCurrency(value as CurrencyCode)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(exchangeRates).map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={swapCurrencies}
            className="mb-1"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
          
          <div>
            <Label htmlFor="toCurrency">To</Label>
            <Select 
              value={toCurrency} 
              onValueChange={(value) => setToCurrency(value as CurrencyCode)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(exchangeRates).map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={handleConvert} className="w-full">Convert</Button>
      </div>
      
      {convertedAmount !== null && (
        <Card className="p-4 bg-primary/5 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">
              {amount} {fromCurrency} =
            </span>
            <span className="font-bold">
              {convertedAmount.toFixed(2)} {toCurrency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Exchange Rate:</span>
            <span className="font-bold">
              1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
};
