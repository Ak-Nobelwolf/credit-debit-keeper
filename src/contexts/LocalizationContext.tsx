
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BadgeDollarSign, BadgeEuro, BadgePoundSterling, BadgeJapaneseYen, BadgeIndianRupee } from "lucide-react";

interface Currency {
  code: string;
  symbol: string;
  name: string;
  icon: any;
}

interface LocalizationContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
  currencies: Currency[];
}

const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", icon: BadgeDollarSign },
  { code: "EUR", symbol: "€", name: "Euro", icon: BadgeEuro },
  { code: "GBP", symbol: "£", name: "British Pound", icon: BadgePoundSterling },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", icon: BadgeJapaneseYen },
  { code: "INR", symbol: "₹", name: "Indian Rupee", icon: BadgeIndianRupee },
];

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('preferredCurrency');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return currencies[0];
      }
    }
    return currencies[0];
  });

  useEffect(() => {
    localStorage.setItem('preferredCurrency', JSON.stringify(currency));
  }, [currency]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <LocalizationContext.Provider
      value={{
        currency,
        setCurrency,
        formatCurrency,
        currencies,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
};
