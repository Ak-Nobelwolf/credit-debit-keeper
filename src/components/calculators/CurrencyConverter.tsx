
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, RefreshCw } from "lucide-react";
import { toast } from "sonner";

// Currency codes and names for the UI
const currencies = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  CNY: "Chinese Yuan",
  INR: "Indian Rupee",
  BRL: "Brazilian Real",
  ZAR: "South African Rand"
};

type CurrencyCode = keyof typeof currencies;

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("USD");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch exchange rates from API
  const fetchExchangeRate = async () => {
    setIsLoading(true);
    try {
      // Using Exchange Rate API (free tier)
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }
      
      const data = await response.json();
      
      if (data.result === "success") {
        const rate = data.rates[toCurrency];
        setExchangeRate(rate);
        setConvertedAmount(amount * rate);
        setLastUpdated(new Date());
      } else {
        throw new Error("Failed to get exchange rates");
      }
    } catch (error) {
      console.error("Exchange rate fetch error:", error);
      toast.error("Failed to fetch exchange rates. Using estimated rates instead.");
      
      // Fallback to estimated rates if API fails
      const fallbackRates = {
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
      
      // Calculate fallback exchange rate
      const fromRate = fallbackRates[fromCurrency];
      const toRate = fallbackRates[toCurrency];
      const rate = toRate / fromRate;
      
      setExchangeRate(rate);
      setConvertedAmount(amount * rate);
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  // Handle currency or amount changes
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      setConvertedAmount(null);
    }
  }, [fromCurrency, toCurrency, amount]);

  const handleConvert = () => {
    fetchExchangeRate();
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Currency Converter</h2>
      <p className="text-muted-foreground">
        Convert between different currencies using real-time exchange rates.
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
                {Object.entries(currencies).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {code} - {name}
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
                {Object.entries(currencies).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {code} - {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handleConvert} 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Loading...
            </>
          ) : (
            "Convert"
          )}
        </Button>
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
          {lastUpdated && (
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Last updated:</span>
              <span>{lastUpdated.toLocaleString()}</span>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
